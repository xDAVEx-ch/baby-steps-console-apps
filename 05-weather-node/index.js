require('dotenv').config();
require('colors');

const { inquirerMenu, pause, readInput, listPlaces } = require("./helpers/inquirer");
const Search = require('./models/search');

const main = async() =>{

    let opt = '';
    const search = new Search();

    do {
        opt = await inquirerMenu();
        switch (opt) {
            case 1:
                //Show your message
                const searchTerm = await readInput('Place: ');

                //Search for results with Mapbox API
                let results = await search.fetchPlaces(searchTerm);

                //Select correct place
                const selectedPlaceId = await listPlaces(results);
                if(selectedPlaceId === '0') continue;

                //Show info
                const selectedPlace = results.find((place) => place.id === selectedPlaceId);

                //Adding new place to log
                search.addToHistory(selectedPlace.name);

                console.log('|Place details|'.blue);
                console.log('Place: ' + selectedPlace.name);
                console.log('Lat: ' + selectedPlace.lat);
                console.log('Long: ' + selectedPlace.lng);

                console.log('\n');

                //Getting weather
                const currentWeather = await search.displayPlaceWeather(selectedPlace);

                //Weather info
                console.log('|Weather details|'.blue);
                console.log('Max: '.yellow + currentWeather.max + ' Celsius');
                console.log('Min: '.yellow + currentWeather.min + ' Celsius');
                console.log('Temperature: '.yellow + currentWeather.temperature);
                console.log('It looks like: '.yellow + currentWeather.desc);

                console.log('\n');
                break;

            case 2:
                search.upperCaseHistory.forEach((place, index) => console.log(`${index + 1} ${place}`));
                break;
        
            default:
                break;
        }
        await pause();
    } while (opt !== 0);
}

main();