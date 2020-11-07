


console.clear();

import fs from 'fs';
import convert from './index.js';


fs.readdir('./', (error, result) => {
    
    for (let i of result) {


        if (i.match(/.txt/)) {
            console.log(123);

            convert('./'+i, '../out/'+i.split('.')[0]+'.js');

        }

    }

});


