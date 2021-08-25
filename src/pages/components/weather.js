import React, { useState, useEffect } from "react";
import Utils from "../helpers/helpers.js";
import "../css/weather.scss";
import {FaSearch} from 'react-icons/fa';

const Weather = (props) => {

  const [location, setLocation] = useState("New York");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [data, setData] = useState("");
  const [mins, setMins] = useState([]);
  const [maxes, setMaxes] = useState([]);

  useEffect(() => {
    if(data) {

      let newMins = [], newMaxes = [];
      data.list.forEach(item => {
        newMins.push(item.main.temp_min);
        newMaxes.push(item.main.temp_max);
      })
      setMins(newMins);
      setMaxes(newMaxes);
    }

  }, [data])

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

  function changeMinValue(event) {
    let newVal = event.target.value;
    if(newVal != null || newVal != undefined) setMinValue(newVal);
  }
  function changeMaxValue(event) {
    let newVal = event.target.value;
    if(newVal != null || newVal != undefined) setMaxValue(newVal);
  }

  function insertMinValue(value) {
    if(value) setMins([...mins, props.metric ? Utils.fahrenheitToKelvin(value) : Utils.celsiusToKelvin(value)]);
  }
  function insertMaxValue(value) {
    if(value) setMaxes([...maxes, props.metric ? Utils.fahrenheitToKelvin(value) : Utils.celsiusToKelvin(value)]);
  }
  
  return (
    <div className="weather">
      <div>
        <form id="weatherForm">
          <input type="text" value={location} onChange={changeLocation}></input>
          <button className="searchButton" type="submit" form="weatherForm" value="Fetch" onClick={(e) => {
            e.preventDefault();
            fetchData();
        }}><FaSearch /></button>
        </form>
        {console.log("Celsius" , Utils.kelvinToCelsius(26.85))}
        {data && <h1>{location}</h1>}
        <ul className="weatherList">
          {data.list && data.list
            .filter(weather => filterByTime(weather.dt) === 15)
            .map(item => {
              //console.log(item);
              //setMins(e => [...e, item.main.temp_min])
              return <li className="listItem" key={item.dt}>
                <img src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`} />
                <p>{Utils.convertUNIX(item.dt).toLocaleDateString("en-US", {weekday: "long", month: "long", day:"numeric"})}</p>
                <p>{props.metric ? `${Utils.kelvinToFahrenheit(item.main.temp)}°F` : `${Utils.kelvinToCelsius(item.main.temp)}°C`}</p>
                <p>{item.weather[0].main}</p>
              </li>
            })
          }
        </ul>
        {data &&
          <div className="tracker">
            <div className="temps">
              <p>Min: {props.metric ? `${Utils.kelvinToFahrenheit(Utils.showMin(mins))}°F` : `${Utils.kelvinToCelsius(Utils.showMin(mins))}°C`}</p>
              <p>Max: {props.metric ? `${Utils.kelvinToFahrenheit(Utils.showMax(maxes))}°F` : `${Utils.kelvinToCelsius(Utils.showMax(maxes))}°C`}</p>
              <p>Mean: {props.metric ? `${Utils.kelvinToFahrenheit(Utils.showMean(maxes.concat(mins)))}°F` : `${Utils.kelvinToCelsius(Utils.showMean(maxes.concat(mins)))}°C`}</p>
              <p>Mode: {props.metric ? `${Utils.kelvinToFahrenheit(Utils.showMode(maxes.concat(mins)))}°F` : `${Utils.kelvinToCelsius(Utils.showMode(maxes.concat(mins)))}°C`}</p>
            </div>
            <div>
              <p>Data is based on next 5 days</p>
              <input type="number" value={minValue} onChange={changeMinValue}></input>
              <button onClick={() => insertMinValue(minValue)}>Insert New Min Value</button>
              <input type="number" value={maxValue} onChange={changeMaxValue}></input>
              <button onClick={() => insertMaxValue(maxValue)}>Insert New Max Value</button>
            </div>
          </div>
        } 
      </div>
    </div>
  )
}

export default Weather;