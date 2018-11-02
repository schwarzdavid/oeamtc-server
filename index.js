const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

console.log(
    '*******************************************************\n' +
    '                   ÖAMTC Roadpatrol                    \n' +
    '*******************************************************\n'
);

fs.readdirSync(path.resolve(__dirname, 'services'), {withFileTypes: true})
    .filter(serviceName => {
        const stats = fs.statSync(path.resolve(__dirname, 'services', serviceName));
        if (!stats.isDirectory()) {
            return false;
        }

        try {
            fs.accessSync(path.resolve(__dirname, 'services', serviceName, 'index.js'), fs.constants.F_OK);
        } catch (err) {
            return false;
        }
        return true;
    })
    .forEach(function fork(name) {
        childProcess.fork(path.resolve(__dirname, 'services', name, 'index.js'))
            .on('exit', () => {
                return fork(name);
            });
    });
