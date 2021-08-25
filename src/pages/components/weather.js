import React, { useState, useEffect } from "react";
import Utils from "../helpers/helpers.js";

const Weather = data => {

  const [mins, setMins] = useState([]);
  const [maxes, setMaxes] = useState([]);
  const [mean, setMean] = useState([]);
  const [mode, setMode] = useState([]);

  function filterByTime(time) {
    var date = Utils.convertUNIX(time)
    return date.getUTCHours()
  } 

  useEffect(() => {
    function setTrackerData() {
      data.data.list && data.data.list
      .filter(weather => filterByTime(weather.dt) === 15)
      .map(item => {
        //setMins([...mins, item.main.temp_min]);
        console.log(item.main.temp_min);
      })
    }

    setTrackerData();
    console.log(mins);
  })

  return <div>
    <div>
      <ol>
        {data.data.list && data.data.list
          .filter(weather => filterByTime(weather.dt) === 15)
          .map(item => {
            //console.log(item);
            //setMins(e => [...e, item.main.temp_min])
            return <li>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
              <p>{Utils.convertUNIX(item.dt).toLocaleDateString("en-US", {weekday: "long", month: "long", day:"numeric"})}</p>
              <p>{Utils.kelvinToCelsius(item.main.temp)}°C</p>
              <p>{Utils.kelvinToFahrenheit(item.main.temp)}°F</p>
            </li>
          })
        }
      </ol>
      <div>
        <p>Min Temp: </p>
        <p>Max Temp: </p>
        <p>Mean Temp: </p>
        <p>Mode Temp: </p>
      </div>
    </div>
  </div>
}

export default Weather;