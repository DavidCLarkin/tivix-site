import React, { useEffect, useState } from "react";
import Weather from "./components/weather.js";

export default function Home() {

  const API_key = process.env.GATSBY_WEATHER_API_KEY;
  const [location, setLocation] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    /*console.log(sessionStorage.getItem("WeatherData"));
    if(sessionStorage.getItem("WeatherData") === null) {
      console.log("fetching");
      fetch(`https://api.openweathermap.org/data/2.5/forecast?id=524901&appid=${API_key}`)
      .then(results => results.json())
      .then(data => setData(data))
      .then(data => {sessionStorage.setItem("WeatherData", data)})
      .catch(err => console.log(err))
    } else {
      console.log("Data exists in session storage");
    }
    */
  },[])

  async function fetchData() {
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_key}`)
    .then(results => results.json())
    .then(data => setData(data))
    .then(data => {sessionStorage.setItem("WeatherData", data)})
    .catch(err => console.log(err))
  }

  function changeLocation(event) {
    setLocation(event.target.value);
  }

  return <div>
    <form id="weatherForm">
      <input type="text" value={location} onChange={changeLocation}></input>
      {console.log(location)}
    </form>
    <button type="submit" form="weatherForm" value="Fetch" onClick={(e) => {
      e.preventDefault();
      fetchData();
    }}>Fetch</button>
    
    <Weather data={data}/>
  </div>
}
