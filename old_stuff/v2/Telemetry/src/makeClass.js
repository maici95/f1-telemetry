


const fs = require('fs');

/**
 * @param {String} inFile
*/
function makeClass(inFile) {
    const file = fs.readFileSync(inFile, 'utf8', (error, file) => file);

    /** @type {Array<String>} */
    let rows = [];
    /** @type {String} */
    let className = '';
    /** @type {Array.<Item>} */
    let items = [];
    /** @type {boolean} */
    let isPacket = false;

    rows = file.split('\r\n');

    for (let i = 0; i < rows.length; i++) {
        if (i === 0) {
            if (rows[i].match('Packet')) {
                isPacket = true;
            }
            className = rows[i].split(' ').reverse()[0];
            continue;
        }
        
        let row = rows[i].replace(/ /g, '');
        const item = new Item();

        if (!row[0] || row[0] === '{' || row[0] === '}' || row[0] === '/' || row[0] === '\t') {
            continue;
        }

        row = row.split('m_');
        item.type = row[0].trim();
        item.key = row[1].split(';')[0].split('[')[0];

        if (row[1].match(/\[[0-9]*\]/)) {
            item.length = row[1].match(/\[[0-9]*\]/)[0];
            item.length = item.length.replace(/[\[\]]/g,'');
        }

        items.push(item);
    }
    return {
        className: className,
        items: items,
        isPacket: isPacket
    }
}


/**
 * @param {String} className 
 * @param {Array.<Item>} items
 * @param {Boolean} isPacket
 */
function writeClass(className, items, isPacket, outPath) {

    let outFile = '';
    outFile += '\n\n\n';
    if (isPacket) {
        outFile += 'const Packet = require(\'../Packet.js\');\n\n';
    } else {
        outFile += 'const Reader = require(\'../Reader.js\');\n\n';
    }

    for (let i of items) {
        if (i.length && i.length > 4 && i.type !== 'char' && i.type !== 'uint8') {
            outFile += 'const '+i.type+' = require(\'./'+i.type+'.js\');\n';
        }
    }

    outFile += '\n';
    outFile += 'module.exports = class '+className+' ';
    outFile += isPacket ? 'extends Packet ' : '';
    outFile += !isPacket ? 'extends Reader ' : '';
    outFile += '{\n';
    outFile += '\tconstructor(buffer, pointer, header) {\n';
    outFile += '\t\tsuper();\n'

    outFile += '\t\t/** @private */\n';
    outFile += '\t\tthis.buffer = buffer;\n';
    outFile += '\t\t/** @private */\n';
    outFile += '\t\tthis.pointer = pointer;\n';
    //outFile += '\t\tthis.header = header;\n';

    for (let i of items) {
        if (i.length && i.length > 4 && i.type !== 'char' && i.type !== 'uint8') {
            outFile += '\t\t';
            outFile += '/** @type {Array.<'+i.type+'> */'
            outFile += '\n';
        }

        outFile += '\t\t';
        outFile += 'this.'+i.key+'';
        if (i.key === 'header') {
            outFile += ' = header';
        } else if (i.length) {
            outFile += ' = []';
        } else {
            outFile += ' = 0';
        }
        outFile += ';\n';
    }
    
    //outFile += '\t\tthis.parse();\n';
    outFile += '\t}\n\n';

    outFile += '\tparse() {\n';
    outFile += '\t\tthis\n'
    for (let i of items) {
        if (i.type === 'PacketHeader') {
            outFile += '//';
        }
        outFile += '\t\t\t';
        outFile += '.'+i.type+'(\''+i.key+'\''
        if (i.length) {
            outFile += ', '+i.length;
        }
        outFile += ')\n';
    }
    outFile += '\t}\n';

    outFile += '\n}\n\n';

/*     outFile += 'module.exports = {\n';
    outFile += '\t'+className+'\n';
    outFile += '}\n'; */

    fs.writeFileSync(`${outPath}${className}.js`, outFile, 'utf8', (error) => error);
}

class Item {
    constructor(key, type, length) {
        this.key = key || null;
        this.type = type || null;
        this.length = length || null;
    }
}

//let c = makeClass(inFile);
//c = writeClass(c.className, c.items, c.isPacket);

module.exports = {
    makeClass,
    writeClass
}
