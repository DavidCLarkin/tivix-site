import sunny from "../../assets/images/animated/sunny.svg";
import littleCloudy from "../../assets/images/animated/littleCloudy.svg";
import clouds from "../../assets/images/animated/overcast.svg";
import shower from "../../assets/images/animated/shower.svg";
import rain from "../../assets/images/animated/rain.svg";
import thunder from "../../assets/images/animated/thunder.svg";
import snow from "../../assets/images/animated/snow.svg";
import mist from "../../assets/images/animated/mist.svg";
var _ = require('lodash');

export default class Helpers {

  static convertIdToSVG(id) {
    switch(id) {
      case "01d":
      case "01n": return sunny 
        
      case "02d":
      case "02n": return littleCloudy

      case "03d":
      case "03n": return clouds

      case "04d":
      case "04n":
      case "09d":
      case "09n": return shower

      case "10d":
      case "10n": return rain

      case "11d":
      case "11n": return thunder

      case "13d":
      case "13n": return snow

      case "50d":
      case "50n": return mist

      default: return 'error'
    }
  }

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
    let temp = Number(celsiusTemp);
    return temp + 273;
  }

  static fahrenheitToKelvin(fahrenheitTemp) {
    return Number(((fahrenheitTemp-32) * 5) / 9 + 273);
  }

  static showMin(arr) {
    return _.min(arr);
  }
  
  static titleCase(str) {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
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
