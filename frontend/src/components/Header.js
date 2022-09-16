import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import "./header.scss";

const Header = () => {
  let { user, logoutUser } = useContext(AuthContext);
  return (
    <div className="header">
      <NavLink exact="true" to="/">
        Home
      </NavLink>
      <span> | </span>

      <NavLink exact="true" to="/about">
        About
      </NavLink>
      <span> | </span>

      {user ? null : (
        <>
          <NavLink exact="true" to="/signup">
            Signup
          </NavLink>{" "}
          <span> | </span>{" "}
        </>
      )}

      {user ? (
        <NavLink exact="true" onClick={logoutUser} to="/login">
          Logout
        </NavLink>
      ) : (
        <NavLink exact="true" to="/login">
          Login{" "}
        </NavLink>
      )}

      {user && (
        <p>
          user = <b>{user.username}</b> welcome to the app
        </p>
      )}
    </div>
  );
};

export default Header;
