import React from "react";
import "../css/button.scss";

function Button(props) {
  return (
    <button className="button" type="submit" onClick={props.handleClick}>
      {props.btnTitle}
    </button>
  );
}

export default Button;

