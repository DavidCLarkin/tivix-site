import React from "react";
import "../css/input.scss";

function Input(props) {
  return (
    <input className="input" type={props.type} value={props.value} placeholder={props.placeholder? props.placeholder : ""} onChange={props.handleChange}/>
  )
}

export default Input;