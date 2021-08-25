import React, { useState, useEffect } from "react";
import Utils from "../helpers/helpers.js";

const Weather = () => {

  const [location, setLocation] = useState("New York");
  const [value, setValue] = useState("");
  const [data, setData] = useState("");
  const [mins, setMins] = useState([]);


  async function fetchData() {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.GATSBY_WEATHER_API_KEY}`)
    .then(results => results.json())
    .then(data => setData(data))
    .then(data => {sessionStorage.setItem("WeatherData", data)})
    .catch(err => console.log(err))
  }

  function filterByTime(time) {
    let date = Utils.convertUNIX(time)
    return date.getUTCHours()
  } 

  function changeLocation(event) {
    setLocation(event.target.value);
  }

  function changeValue(event) {
    let newVal = event.target.value;
    if(newVal != null || newVal != undefined) setValue(newVal);
  }

  function insertValue(value) {
    if(value) setMins([...mins, value]);
    console.log(mins);
  }
  
  return <div>
    <div>
      <form id="weatherForm">
        <input type="text" value={location} onChange={changeLocation}></input>
      </form>
      <button type="submit" form="weatherForm" value="Fetch" onClick={(e) => {
        e.preventDefault();
        fetchData();
      }}>Fetch</button>
      {console.log(Utils.showMode([1,1,2,3,4,4,4]))}
      <ol>
        {data.list && data.list
          .filter(weather => filterByTime(weather.dt) === 15)
          .map(item => {
            console.log(item);
            //setMins(e => [...e, item.main.temp_min])
            return <li key={item.dt}>
              <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
              <p>{Utils.convertUNIX(item.dt).toLocaleDateString("en-US", {weekday: "long", month: "long", day:"numeric"})}</p>
              <p>{Utils.kelvinToCelsius(item.main.temp)}°C</p>
              <p>{Utils.kelvinToFahrenheit(item.main.temp)}°F</p>
            </li>
          })
        }
      </ol>
      <div>
        <input type="number" value={value} onChange={changeValue}></input>
        <button onClick={() => insertValue(value)}>Insert Value</button>
        <p>Min Temp: </p>
        <p>Max Temp: </p>
        <p>Mean Temp: </p>
        <p>Mode Temp: </p>
      </div>
    </div>
  </div>
}

export default Weather;