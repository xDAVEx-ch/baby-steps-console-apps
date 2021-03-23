const fs = require('fs');
const axios = require('axios');
const { encode } = require('querystring');

class Search {
    history = [];
    currentLocation = [];
    placesDataLog = './data/data.json';

    constructor() {
        this.readInDataFile();
    }

    get mapboxUrlParams() {
        return {
            'access_token': process.env.MAPBOX_KEY,
            'limit': 5
        }
    }

    get openWeatherUrlParams() {
        return {
            'lat': this.currentLocation[0],
            'lon': this.currentLocation[1],
            'appid': process.env.OPEN_WEATHER,
            'units': 'metric'
        }
    }

    get upperCaseHistory() {
        const upperCaseHistory = this.history.map((place) => place.toUpperCase());

        return upperCaseHistory;
    }

    async fetchPlaces(place = '') {
        try {
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json`,
                params: this.mapboxUrlParams
            });

            let resp = await instance.get();

            return resp.data.features.map((place) => ({
                id: place.id,
                name: place.place_name,
                lng: place.center[0],
                lat: place.center[1]
            }));
        } catch (error) {
            return [];
        }
    }

    async displayPlaceWeather(selectedPlace) {

        const { lat, lng } = selectedPlace;
        this.currentLocation = [lat, lng];

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: this.openWeatherUrlParams
            });

            let resp = await instance.get();
            const { weather: weatherInfo, main: tempInfo } = resp.data;

            return {
                desc: weatherInfo[0].description,
                min: tempInfo.temp_min,
                max: tempInfo.temp_max,
                temperature: tempInfo.temp
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    addToHistory(place = '') {

        if (this.history.includes(place.toLowerCase())) {
            return;
        }

        this.history = this.history.splice(0, 4);

        this.history.unshift(place.toLowerCase());
        this.writeInDataFile();
    }

    writeInDataFile() {

        const payload = {
            history: this.history
        }

        fs.writeFileSync(this.placesDataLog, JSON.stringify(payload));
    }

    readInDataFile() {

        try {
            const data = fs.readFileSync(this.placesDataLog, { encoding: 'utf-8' });

            this.history = JSON.parse(data).history;
        } catch (error) {
            return;
        }
    }
}

module.exports = Search;