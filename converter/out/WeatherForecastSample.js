// packet : WeatherForecastSample


module.exports = function WeatherForecastSample(struct) {
struct
	.uint8('sessionType')
	.uint8('timeOffset')
	.uint8('weather')
	.int8('trackTemperature')
	.int8('airTemperature')
}
