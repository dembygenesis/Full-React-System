/**
 * ===================================================
 * Modifies webpack.config.js to use production in env
 * ===================================================
 */
const fs = require('fs');

// Open file and rewrite
let inputDir  = 'src/axios-compliance-link.js';
let outputDir = 'src/axios-compliance-link.js';

fs.readFile(inputDir, 'utf8', function (err, data) {
    if (err) {
        throw new Error(err);
    }

    const dev = 'http://localhost:8080/api/v1/';
    const prod = 'https://csgoskin2keys.com/api/v1/';

    data = data.replace(dev, prod);

    fs.writeFile(outputDir, data, 'utf8', function (err) {
        if (err) {
            throw new Error(err);
        }
    });
});