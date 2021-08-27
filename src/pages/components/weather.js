import React, { useState, useEffect } from "react";
import Utils from "../helpers/helpers.js";
import "../css/weather.scss";
import {FaSearch} from 'react-icons/fa';
import Button from "../components/button.js";
import Input from "../components/input.js";
import Slide from "react-reveal/Slide";
import wind from "../../assets/images/animated/wind.svg";
import compass from "../../assets/images/animated/compass.svg";

const Weather = () => {

  const [location, setLocation] = useState("");
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");
  const [data, setData] = useState(null);
  const [mins, setMins] = useState([]);
  const [maxes, setMaxes] = useState([]);
  const [fahrenheit, setFahrenheit] = useState(true);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    if(data) {
      let newMins = [], newMaxes = [];
      try {
        data !== "" && data.list.forEach(item => {
          newMins.push(item.main.temp_min);
          newMaxes.push(item.main.temp_max);
        })
        setMins(newMins);
        setMaxes(newMaxes);
      }
      catch(error) {
        console.log("error, no data", error);
      }

    }

  }, [data])

  async function fetchData() {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.GATSBY_WEATHER_API_KEY}`)
    .then(results => results.json())
    .then(data => setData(data))
    .then(data => {sessionStorage.setItem("WeatherData", data)})
    .then(setLoading(false))
    .catch(err => console.log(err))
  }

  function changeMetric() {
    setFahrenheit(!fahrenheit);
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
    if(newVal !== null || newVal !== undefined) setMinValue(newVal);
  }
  function changeMaxValue(event) {
    let newVal = event.target.value;
    if(newVal !== null || newVal !== undefined) setMaxValue(newVal);
  }

  function insertMinValue(value) {
    if(value) setMins([...mins, (fahrenheit ? Utils.fahrenheitToKelvin(value) : Utils.celsiusToKelvin(value))]);
  }
  function insertMaxValue(value) {
    if(value) setMaxes([...maxes, (fahrenheit ? Utils.fahrenheitToKelvin(value) : Utils.celsiusToKelvin(value))]);
  }
  
  return (
    <div className="weather">
      <div>
        <section className="headers">
          <div className="form">
            <form id="weatherForm">
              <Input type="text" value={location} placeholder={"Search..."} handleChange={changeLocation}/>
              <Button btnTitle={<FaSearch />} handleClick={(e) => {
                e.preventDefault();
                fetchData();
              }}></Button>
            </form>
          </div>
          <div className="metric">
            <p>Metric: {fahrenheit ? `°F` : `°C`}</p>
            <label className="switch">
              <input type="checkbox" onClick={changeMetric}/>
              <span className="slider round"></span>
            </label>
          </div>
        </section>

        {loading ? <div className="loadingDiv">Make a search request and it'll load here!</div> :
        data && <h1 className="title">{location}</h1>}
        <ul className="weatherList">
          {(data?.list !== undefined || null) && data.list
            .filter(weather => filterByTime(weather.dt) === 12)
            .map(item => {
              console.log(item);
              return <li className="listItem" key={item.dt}>
                <div className="frontCard">
                  <p>{Utils.convertUNIX(item.dt).toLocaleDateString("en-US", {weekday: "long", month: "long", day:"numeric"})}</p>
                  <img className="iconSvg" src={Utils.convertIdToSVG(item.weather[0].icon)} alt={item.weather[0].main} />
                  <p>{fahrenheit ? `${Utils.kelvinToFahrenheit(item.main.temp)}°F` : `${Utils.kelvinToCelsius(item.main.temp)}°C`}</p>
                  <p>{item.weather[0].main}</p>
                </div>
                <div className="backCard">
                  <p>Humidity: {item.main.humidity}%</p>
                  <p>Wind</p>
                  <img src={wind} alt="wind"/>
                  <p>{(item.wind.speed)} mph</p>
                  <p>Direction</p>
                  <img className="directionSvg" src={compass} alt="direction" style={{transform:`rotate(${item.wind.deg}deg)`}}></img>
                </div>
              </li>
            })
          }
        </ul>
        {data &&
          <div className="tracker">
            <div className="temps">
              <p>Min: {fahrenheit ? `${Utils.kelvinToFahrenheit(Utils.showMin(mins))}°F` : `${Utils.kelvinToCelsius(Utils.showMin(mins))}°C`}</p>
              <p>Max: {fahrenheit ? `${Utils.kelvinToFahrenheit(Utils.showMax(maxes))}°F` : `${Utils.kelvinToCelsius(Utils.showMax(maxes))}°C`}</p>
              <p>Mean: {fahrenheit ? `${Utils.kelvinToFahrenheit(Utils.showMean(maxes.concat(mins)))}°F` : `${Utils.kelvinToCelsius(Utils.showMean(maxes.concat(mins)))}°C`}</p>
              <p>Mode: {fahrenheit ? `${Utils.kelvinToFahrenheit(Utils.showMode(maxes.concat(mins)))}°F` : `${Utils.kelvinToCelsius(Utils.showMode(maxes.concat(mins)))}°C`}</p>
            </div>
            <div className="dataChanger">
              <p>Data is based on next 5 days</p>
              <div className="dataInputs">
                <div className="dataAdder">
                  <Input type={"number"} value={minValue} placeholder={"Enter Min"} handleChange={changeMinValue}/>
                  <Button handleClick={() => insertMinValue(minValue)} btnTitle={"Add New Min"}/>
                </div>
                <div className="dataAdder">
                  <Input type={"number"} value={maxValue} placeholder={"Enter Max"} handleChange={changeMaxValue}/>
                  <Button handleClick={() => insertMaxValue(maxValue)} btnTitle={"Add New Max"}/>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}

export default Weather;