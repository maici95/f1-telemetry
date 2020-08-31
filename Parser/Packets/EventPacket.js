


// event packet
module.exports = function EventPacket(p) {

    p.createObject('event');

    p
        //.arr('eventString', 'uint8', 4)
        .char('eventString', 4)
        .addToObject('event')


    console.log(p.data.event);


}
