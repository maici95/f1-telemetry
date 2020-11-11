// packet : PacketCarTelemetryData


module.exports = function PacketCarTelemetryData(struct) {
struct
	.CarTelemetryData('carTelemetryData', 22)
	.uint32('buttonStatus')
	.uint8('mfdPanelIndex')
	.uint8('mfdPanelIndexSecondaryPlayer')
	.int8('suggestedGear')
}
