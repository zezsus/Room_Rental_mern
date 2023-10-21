import React from "react";
import "../assets/styles/Header.scss";
import icons from "../util/icons";
import { Link } from "react-router-dom";

const Header = () => {
  const { BiSearch } = icons;
  return (
    <div className="header">
      <div className="header-left">
        <Link to="/" className="text">
          ROOMRENTAL
        </Link>
      </div>
      <div className="header-center">
        <form className="form-search">
          <input
            type="text"
            className="form-search-input"
            placeholder="Search..."
          />
          <button type="button" className="btn-search">
            <BiSearch size={20} />
          </button>
        </form>
      </div>
      <div className="header-right">
        <ul className="list-itmes">
          <li>
            <Link className="link-home mx-2" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="link-about mx-2" to="/about">
              About
            </Link>
          </li>
          <li>
            <Link className="link-sign-in mx-2" to="/sign-in">
              SignIn
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
