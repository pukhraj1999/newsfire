import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
class Navbar extends Component {
  showMenu = () => {
    let toggle = document.getElementById("menu");
    toggle.classList.toggle("activate");
  };
  render() {
    return (
      <>
        <div className="nav__box">
          <div className="nav__left">
            <p> 🔥NewsFire</p>
          </div>
          <div id="menu" className="nav__right">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/business">Business</NavLink>
            <NavLink to="/entertainment">Entertainment</NavLink>
            <NavLink to="/science">Science</NavLink>
            <NavLink to="/health">Health</NavLink>
            <NavLink to="/sports">Sports</NavLink>
            <NavLink to="/technology">Technology</NavLink>
          </div>
          <div className="toggler">
            <i
              onClick={() => {
                this.showMenu();
              }}
              className="fas fa-2x fa-bars"
            ></i>
          </div>
        </div>
        <div className="spacing"></div>
      </>
    );
  }
}

export default Navbar;
