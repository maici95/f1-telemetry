


const fs = require('fs');
const convert = require('./index.js');

fs.readdir('./', (error, result) => {
    for (let i of result) {
        if (i.match(/.txt/)) {
            convert('./'+i, '../out/'+i.split('.')[0]+'.js');
        }
    }
});
