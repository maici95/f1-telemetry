


module.exports = function CarTelemetry(p) {
    for (let i = 0; i < 22; i++) {

    p
        .uint16('speed')
        .float('throttle')
        .float('steer')
        .float('brake')
        .uint8('clutch')
        .int8('gear')
        .uint16('engineRPM')
        .uint8('drs')
        .uint8('revLightsPercent')
        .arr('brakesTemperature', 'uint16', 4)
        .arr('tyresSurfaceTemperature', 'uint8', 4)
        .arr('tyresInnerTemperature', 'uint8', 4)
        .uint16('engineTemperature')
        .arr('tyresPressure', 'float', 4)
        .arr('surfaceType', 'uint8', 4)
        .toArray()
    }

    p
        .saveArray('carTelemetryData')
        .uint32             ('buttonStatus')
        .uint8              ('mfdPanelIndex')
        .uint8              ('mfdPanelIndexSecondaryPlayer')
        .int8               ('suggestedGear')
        .saveObject('carTelemtry')
}
