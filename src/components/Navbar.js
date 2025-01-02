import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#282c34", color: "white" }}>
      <Link to="/" style={{ margin: "10px", textDecoration: "none", color: "white" }}>Home</Link>
      <Link to="/about" style={{ margin: "10px", textDecoration: "none", color: "white" }}>About</Link>
      <Link to="/login" style={{ margin: "10px", textDecoration: "none", color: "white" }}>Login</Link>
      <Link to="/signup" style={{ margin: "10px", textDecoration: "none", color: "white" }}>Signup</Link>
    </nav>
  );
}

export default Navbar;
