const { createFile } = require('./helpers');
const argv = require('./config/yargs');

console.clear();

createFile(argv.b, argv.l, argv.h)
    .then(nameFile => console.log(nameFile, 'creado'))
    .catch(error => console.log(error))