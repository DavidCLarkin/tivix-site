var _ = require('lodash');

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

  static celsiusToKelvin(celsiusTemp) {
    return celsiusTemp + 273;
  }

  static fahrenheitToKelvin(fahrenheitTemp) {
    return ((fahrenheitTemp-32) * 5) / 9 + 273;
  }

  static showMin(arr) {
    return _.min(arr);
  }

  static showMax(arr) {
    return _.max(arr);
  }

  static showMean(arr) {
    let sum = 0;
    for(let i = 0; i < arr.length; i++) {
      sum+=arr[i];
    }
    return sum / arr.length;
  }

  static showMode(arr) {
    let max = 0, frequency = {}, highestKey = 0;
    arr.sort();
    for(let i = 0; i < arr.length; i++) {
      if(!frequency[arr[i]]) {
        frequency[arr[i]] = 1;
      } else {
        frequency[arr[i]] += 1;
      }
    }

    for(let key in frequency) {
      const val = frequency[key];
      if(val > max) {
        max = val;
        highestKey = key;
      }
    }

    return highestKey;
  }
}