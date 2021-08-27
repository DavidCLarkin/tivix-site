import React from "react";
import Weather from "./components/weather.js";
import "./css/base.scss";

export default function Home() {
  return <main className="main">
    <div className="wrapper">
      <div className="appNameDiv">
        <h1 className="appName">Weather App</h1>
      </div>
      <Weather/>
    </div>
    <footer></footer>
  </main>
}
