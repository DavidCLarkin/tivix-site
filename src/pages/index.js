import React from "react";
import Weather from "./components/weather.js";
import "./css/base.scss";
import bg1 from "../assets/images/tabbied1.png";

export default function Home() {
  return <main className="main">
    <div className="wrapper">
      <div className="appNameDiv">
        <h1 className="appName">Weather App</h1>
      </div>
      <img className="bg" src={bg1} alt="bgOrbs"/>
      <img className="bg2" src={bg1} alt="bgOrbs"/>
      <Weather/>
    </div>
    <footer></footer>
  </main>
}
