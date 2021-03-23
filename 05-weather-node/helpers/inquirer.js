require('colors');

const inquirer = require('inquirer');

const questions = [{
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
        {
            value: 1,
            name: `${'1.'.green}Search city`
        },
        {
            value: 2,
            name: `${'2.'.green}History`
        },
        {
            value: 0,
            name: `${'0.'.green}Exit`
        }
    ]
}];

const pauseForEnter = [{
    type: 'input',
    name: 'pause',
    message: `Press ${'ENTER'.blue} to continue`,
}];

const inquirerMenu = async() =>{
    console.clear();

    console.log('==============='.green);
    console.log('Select your option');
    console.log('===============\n'.green);

    const {option} = await inquirer.prompt(questions)

    return option;
}

const pause = async() =>{

    await inquirer.prompt(pauseForEnter);
}

const readInput = async(msg) => {

    const question = [
        {
            type: 'input',
            name: 'desc',
            message: msg,
            validate(value){
                if(value.length === 0){
                    return 'Please enter any value'
                }

                return true;
            }
        }
    ];

    const {desc} = await inquirer.prompt(question);
    return desc;
}

const listPlaces = async(places) =>{
    const choices = places.map((place, index) =>{
        const idx = `${index + 1}`.green;

        return {
            value: place.id,
            name: `${idx} ${place.name}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0'.green + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Select place',
            choices
        }
    ];

    const {id} = await inquirer.prompt(questions);

    return id;
}

const confirm = async (msg) =>{
    const questions = [
        {
            type: 'confirm',
            name: 'accept',
            message: msg
        }
    ];

    const {accept} = await inquirer.prompt(questions);

    return accept;
}

const displayListCheckList = async(tasks) =>{
    const choices = tasks.map((task, index) =>{
        const idx = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.finish) ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selections',
            choices
        }
    ];

    const {ids} = await inquirer.prompt(questions);

    return ids;
}

module.exports = {
    inquirerMenu,
    pause, readInput,
    listPlaces,
    confirm,
    displayListCheckList
}