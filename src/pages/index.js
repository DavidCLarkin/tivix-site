import React, { useState } from "react";
import Header from "./components/header.js";
import Weather from "./components/weather.js";
import "./css/base.scss";
import bg1 from "../assets/images/tabbied1.png";


export default function Home() {
  return <main className="main">
    <div className="wrapper">
      <img className="bg" src={bg1} />
      <img className="bg2" src={bg1} />
      <Weather/>
    </div>
    <footer></footer>
  </main>
}
