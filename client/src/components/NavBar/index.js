import React,{useState} from "react";
import { NavLink } from "react-router-dom";
// import * as style from "./NavBar.module.scss";
import './navbar.css';
export const NavBar = () => {
  const [click , setClick] = useState(false);

  const handleClick = () => setClick(!click);
    
  

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink className="nav-logo" to="/">
          Tadesa
          <i className="fas fa-code"></i>
        </NavLink>

        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-links" to="/search" onClick={handleClick}>
              Search
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink activeClassName="active" className="nav-links" to="/collections" onClick={handleClick}>
              Collections
            </NavLink>
          </li>
        </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={!click ? 'fas fa-times' : 'fas fa-bars'}></i>
          </div>
      </div>
    </nav>
  );
};
