


// session packet
module.exports = function SessionPacket(p) {
    p
        .uint8('weather')
        .int8('trackTemperature')
        .int8('airTemperature')
        .uint8('totalLaps')
        .uint16('trackLength')
        .uint8('sessionType')
        .int8('trackId')
        .uint8('formula')
        .uint16('sessionTimeLeft')
        .uint16('sessionDuration')
        .uint8('pitSpeedLimit')
        .uint8('gamePaused')
        .uint8('isSpectating')
        .uint8('spectatorCarIndex')
        .uint8('sliProNativeSupport')
        .uint8('numMarshalZones')
        .saveObject('PacketSessionData')

        for (let i = 0; i < 21; i++) {
            p
                .float('zoneStart')
                .int8('zoneFlag')
                .toArray()
        }

        p
            .saveArray('marshalZones')
            .uint8('safetyCarStatus')
            .uint8('networkGame')
            .uint8('numWeatherForecastSamples')
            .addToObject('PacketSessionData')

        for (let i = 0; i < 20; i++) {
            p
                .uint8('sessionType')
                .uint8('timeOffset')
                .uint8('weather')
                .int8('trackTemperature')
                .int8('airTemperature')
                .toArray()
        }
        
        p.saveArray('weatherForecastSamples')
}
