require('colors');

const inquirer = require('inquirer');

const questions = [{
    type: 'list',
    name: 'option',
    message: 'What do you want to do?',
    choices: [
        {
            value: '1',
            name: `${'1.'.green}Create task`
        },
        {
            value: '2',
            name: `${'2.'.green}List tasks`
        },
        {
            value: '3',
            name: `${'3.'.green}List complete tasks`
        },
        {
            value: '4',
            name: `${'4.'.green}List pending tasks`
        },
        {
            value: '5',
            name: `${'5.'.green}Complete task`
        },
        {
            value: '6',
            name: `${'6.'.green}Delete task`
        },
        {
            value: '0',
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

const listDeleteTasksMenu = async(tasks) =>{
    const choices = tasks.map((task, index) =>{
        const idx = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${idx} ${task.desc}`
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
            message: 'Delete',
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
    listDeleteTasksMenu,
    confirm,
    displayListCheckList
}