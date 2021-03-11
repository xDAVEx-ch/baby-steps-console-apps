require('colors');

//const {displayMenu, pause} = require('./helpers/messages');

const {
    inquirerMenu, 
    pause, 
    readInput, 
    listDeleteTasksMenu,
    confirm,
    displayListCheckList
} = require('./helpers/inquirer');
const TasksList = require('./models/tasks');
const {saveData, readDbFile} = require('./helpers/tasks-data');

const main = async() =>{

    let opt = '';
    const tasks = new TasksList();

    const tasksFromDb = readDbFile();

    if(tasksFromDb){
        tasks.loadTasksFromArr(tasksFromDb);
    }

    do{
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Description: ');
                tasks.createTask(desc);
                break;
            case '2':
                //console.log(tasks.listArr);
                console.log(tasks.displayCompleteList());
                break;

            case '3':
                console.log(tasks.displayCompletePendingTasks());
                break;

            case '4':
                console.log(tasks.displayCompletePendingTasks(false));
                break;

            case '5':
                const ids = await displayListCheckList(tasks.listArr);
                tasks.toogleFinish(ids);
                break;

            case '6':
                const id = await listDeleteTasksMenu(tasks.listArr);

                if(id !== '0'){
                    const accept = await confirm('Are you sure to delete this task?');

                    if(accept){
                        tasks.deleteTask(id);
                        console.log('Task deleted');
                    }
                }
                break;
        
            default:
                break;
        }

        saveData(JSON.stringify(tasks.listArr));
        await pause();
    }while(opt !== '0')

    
};

main();