const { v4: uuidGenerator } = require('uuid');
class Task{

    id = '';
    desc = '';
    finish = null;

    constructor(desc){
        this.id = uuidGenerator();
        this.desc = desc;
    }
}

module.exports = Task;