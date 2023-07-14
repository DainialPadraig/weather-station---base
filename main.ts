function readSensors () {
    airTemp = weatherbit.temperature() / 100
    humidity = weatherbit.humidity() / 1024
    pressure = weatherbit.pressure() / 25600
    rain = weatherbit.rain()
    windSpeed = weatherbit.windSpeed()
    windDirection = weatherbit.windDirection()
    soilTemperature = weatherbit.soilTemperature()
    soilMoisture = weatherbit.soilMoisture()
}
function displayReadings () {
    basic.showString("Air temp: " + convertToF(airTemp) + " deg F")
    basic.pause(200)
    basic.showString("Humidity: " + Math.round(humidity) + "%")
    basic.pause(200)
    basic.showString("Pressure: " + Math.round(pressure) + " hPa")
    basic.pause(200)
    basic.showString("Rain: " + rain + " inches")
    basic.pause(200)
    basic.showString("Wind speed: " + windSpeed + " mph")
    basic.pause(200)
    basic.showString("Wind direction: " + windDirection)
    basic.pause(200)
    basic.showString("Soil moisture: " + soilMoisture)
    basic.pause(200)
    basic.showString("Soil temp: " + convertToF(soilTemperature) + " deg F")
    basic.pause(200)
    basic.clearScreen()
}
function sendReadings () {
    radio.sendValue("airTemp", convertToF(airTemp))
    radio.sendValue("humidity", humidity)
    radio.sendValue("pressure", pressure)
    radio.sendValue("rain", rain)
    radio.sendValue("windSpeed", windSpeed)
    radio.sendString(windDirection)
    radio.sendValue("soilMoisture", soilMoisture)
    radio.sendValue("soilTemperature", convertToF(soilTemperature))
}
function convertToF (tempC: number) {
    return Math.round(9 / 5 * tempC + 32)
}
let soilMoisture = 0
let soilTemperature = 0
let windDirection = ""
let windSpeed = 0
let rain = 0
let pressure = 0
let humidity = 0
let airTemp = 0
weatherbit.startWeatherMonitoring()
weatherbit.startRainMonitoring()
weatherbit.startWindMonitoring()
radio.setGroup(20)
basic.forever(function () {
    readSensors()
    displayReadings()
    sendReadings()
})
