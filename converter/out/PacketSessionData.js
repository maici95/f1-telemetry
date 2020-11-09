// packet : PacketSessionData


module.exports = function PacketSessionData(struct) {
struct
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
    .MarshalZone('marshalZones', 21)
    .uint8('safetyCarStatus')
    .uint8('networkGame')
    .uint8('numWeatherForecastSamples')
    .WeatherForecastSample('weatherForecastSamples', 20)
}
