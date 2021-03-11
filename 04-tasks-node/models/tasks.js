const Task = require('./task');

class Tasks{
    _list = {};

    constructor(){
        this._list = {};
    }

    get listArr(){
        const list = [];

        Object.keys(this._list).forEach((key) =>{
            list.push(this._list[key]);
        });

        return list;
    }

    loadTasksFromArr(tasks){
        tasks.forEach((task)=>{
            this._list[task.id] = task;
        });
    }

    createTask(desc = ''){
        const tarea = new Task(desc);

        this._list[tarea.id] = tarea;
    }

    displayCompleteList(){

        let text = '';
        this.listArr.forEach(({desc: taskDesc, finish: taskState}, index) =>{
            if(taskState){
                text += `${index+1}. ${taskDesc} | ${'Complete'.green} ${'Finish: ' + taskState}\n`;
            } else {
                text += `${index+1}. ${taskDesc} | ${'Pending'.red}\n`;
            }
            
        });

        return text;
    }

    displayCompletePendingTasks(complete = true){

        let text = '';
        this.listArr.forEach(({desc: taskDesc, finish: taskState}, index) =>{

            if(!!(taskState) === complete){
                text += `${index+1}. ${taskDesc} | ${taskState 
                    ? 'Complete '.green +' at '+ taskState
                    : 'Pending'.red}\n`;
            }
            
        });

        return text;
    }

    deleteTask(id = ''){
        if(this._list[id]){
            delete this._list[id];
        }
    }

    toogleFinish(ids = []){

        ids.forEach( id =>{
            const task = this._list[id];
            if(!task.finish){
                task.finish = new Date().toISOString();
            }
        });

        this.listArr.forEach(task =>{
            if(!ids.includes(task.id)){
                this._list[task.id].finish = null;
            }
        });

    }
}

module.exports = Tasks;