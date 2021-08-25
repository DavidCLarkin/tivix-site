import React, { useState } from "react";
import Header from "./components/header.js";
import Weather from "./components/weather.js";
import "./css/base.scss";
import bg1 from "../assets/images/tabbied1.png";


export default function Home() {

  const [fahrenheit, setFahrenheit] = useState(true);

  function changeMetric() {
    setFahrenheit(!fahrenheit);
  }

  return <main className="main">
    <div className="wrapper">
      <p>Metric</p>
      <label class="switch">
        <input type="checkbox" onClick={changeMetric}/>
        <span class="slider round"></span>
      </label>
      <img className="bg" src={bg1} />
      <img className="bg2" src={bg1} />
      <Weather metric={fahrenheit}/>
    </div>
    <footer></footer>
  </main>
}
