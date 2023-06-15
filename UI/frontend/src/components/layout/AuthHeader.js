import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header id="header" className="fixed-top">
      <div className="container d-flex align-items-center">
      <h1  className="logo me-auto"><Link to={"/"}>KozmosEdu</Link></h1>


        <nav id="navbar" className="navbar order-last order-lg-0">
          <ul>
          <li className="active cursor-pointer"><Link className="black" to="">Anasayfa</Link></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};

export default Header;
