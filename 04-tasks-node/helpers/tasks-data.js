const fs = require('fs');

const filePath = './data/data.json';

const saveData = (data) =>{
    fs.writeFileSync(filePath, data);
}

const readDbFile = () =>{

    if(!fs.existsSync(filePath)){
        return null;
    }

    const info = fs.readFileSync(filePath, {encoding: 'utf-8'});
    const data = JSON.parse(info);

    return data;
}

module.exports = {
    saveData, readDbFile
}