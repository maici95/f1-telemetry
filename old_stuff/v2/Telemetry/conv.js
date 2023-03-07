


const fs = require('fs');

const { makeClass, writeClass } = require('./src/makeClass');
const dir = fs.readdirSync('./packets', (error, dir) => dir);


for (let i of dir) {
    let c = makeClass('./packets/'+i);
    c = writeClass(c.className, c.items, c.isPacket, './out/');
}
