import React, { useEffect, useState } from "react";
import Weather from "./components/weather.js";
import "./css/base.scss";

export default function Home() {
  return <div className="wrapper">
    <header></header>
    <Weather />
    <footer></footer>
  </div>
}
