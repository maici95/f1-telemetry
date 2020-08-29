


module.exports = function Participants(p) {
    p
        .uint8('numActiveCars')
        .saveObject('packetParticipantsData')

    for (let i = 0; i < 22; i++) {
        p
            .uint8('aiControlled')
            .uint8('driverId')
            .uint8('teamId')
            .uint8('raceNumber')
            .uint8('nationality')
            .char('name', 48)
            .uint8('yourTelemetry')
            .toArray()
    }
    
    p.saveArray('participants')

}
