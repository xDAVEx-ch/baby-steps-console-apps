const argv = require('yargs')
    .options({
        'b': {
            alias: 'base',
            type: 'number',
            demandOption: true
        },
        'l': {
            alias: 'list',
            default: false,
            type: 'boolean',
        },
        'h': {
            alias: 'hidden',
            type: 'number',
            default: 10
        }
    }).check((argv, options) => {
        if (isNaN(argv.b) || isNaN(argv.h)) {
            throw 'Base must be a number. Text not allowed';
        }

        return true;
    }).argv;

module.exports = argv;