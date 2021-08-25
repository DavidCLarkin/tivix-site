
export default class Helpers {
  static convertUNIX(unixTime) {
    return new Date(unixTime * 1000);
  }

  static kelvinToCelsius(kelvinTemp) {
    return Math.round(kelvinTemp - 273);
  }

  static kelvinToFahrenheit(kelvinTemp) {
    return Math.round((kelvinTemp - 273) * 9 / 5 + 32)
  }
}