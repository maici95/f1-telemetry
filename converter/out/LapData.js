// packet : LapData


export default function LapData(struct) {
struct
    .float('lastLapTime')
    .float('currentLapTime')
    .uint16('sector1TimeInMS')
    .uint16('sector2TimeInMS')
    .float('bestLapTime')
    .uint8('bestLapNum')
    .uint16('bestLapSector1TimeInMS')
    .uint16('bestLapSector2TimeInMS')
    .uint16('bestLapSector3TimeInMS')
    .uint16('bestOverallSector1TimeInMS')
    .uint8('bestOverallSector1LapNum')
    .uint16('bestOverallSector2TimeInMS')
    .uint8('bestOverallSector2LapNum')
    .uint16('bestOverallSector3TimeInMS')
    .uint8('bestOverallSector3LapNum')
    .float('lapDistance')
    .float('totalDistance')
    .float('safetyCarDelta')
    .uint8('carPosition')
    .uint8('currentLapNum')
    .uint8('pitStatus')
    .uint8('sector')
    .uint8('currentLapInvalid')
    .uint8('penalties')
    .uint8('gridPosition')
    .uint8('driverStatus')
    .uint8('resultStatus')
}
