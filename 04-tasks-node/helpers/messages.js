require('colors');

const displayMenu = () =>{

    return new Promise( (resolve) =>{
        console.clear();
        console.log('==============='.green);
        console.log('Select your option');
        console.log('===============\n'.green);

        console.log(`${'1'.blue}. Create task`);
        console.log(`${'2'.blue}. List tasks`);
        console.log(`${'3'.blue}. List complete tasks`);
        console.log(`${'4'.blue}. List pending tasks`);
        console.log(`${'5'.blue}. Complete task`);
        console.log(`${'6'.blue}. Delete task`);
        console.log(`${'0'.blue}. Exit\n`);

        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('Write your choice ', (opt) =>{
            console.log('Your option: ', opt);
            resolve(opt);
            readLine.close();
        });
    });
    
}

const pause = () =>{

    return new Promise( (resolve) => {
        const readLine = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });

        readLine.question('\nPress ENTER to continue\n'.green, (opt) =>{
            resolve(opt);
            readLine.close();
        });
    });
    
}

module.exports = {
    displayMenu,
    pause
}