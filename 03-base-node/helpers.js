
const fileSystem = require('fs');

//hiddenValue limits the table until its value

const createFile = (base = 5, shouldList, hiddenValue) => {
    let output = '\n';
    let fileName = `./output/tabla${base}.txt`;

    const promise = new Promise((resolve, rejects) =>{

        for (let i = 1; i <= hiddenValue; i++) {
            output += `${base}x${i} = ${base * i} \n`;
        }

        try{
            fileSystem.writeFileSync(fileName, output);
        } catch(error){
            rejects(error)
        }
        
        resolve(fileName);
        
    });

    if(shouldList){
        console.log(output);
        console.log('finish!!');
    } else {
        console.log('finish!!');
    }

    return promise;
}

module.exports = {
    createFile
}