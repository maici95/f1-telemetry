// packet : CarTelemetryData


export default function CarTelemetryData(struct) {
struct
    .uint16('speed')
    .float('throttle')
    .float('steer')
    .float('brake')
    .uint8('clutch')
    .int8('gear')
    .uint16('engineRPM')
    .uint8('drs')
    .uint8('revLightsPercent')
    .uint16('brakesTemperature', 4)
    .uint8('tyresSurfaceTemperature', 4)
    .uint8('tyresInnerTemperature', 4)
    .uint16('engineTemperature')
    .float('tyresPressure', 4)
    .uint8('surfaceType', 4)
}
