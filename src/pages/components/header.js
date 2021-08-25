import React from 'react';
import "../css/header.scss"

const Header = () => {
  return <div>
    <nav>
      <div className="nav">
        <img style={{width:"100px", height:"100px"}}src="https://image.shutterstock.com/image-vector/link-flat-icon-illustration-vector-600w-1551448580.jpg" alt="logo"></img>
        <h1>Weather</h1>
      </div>
    </nav>

  </div>
}

export default Header;