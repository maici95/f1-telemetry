


const TeleLink = require('../TeleLink');

const tLink = new TeleLink(3000);

setInterval(() => {
    tLink.emit('packet', { test: 3 });
}, 250);
