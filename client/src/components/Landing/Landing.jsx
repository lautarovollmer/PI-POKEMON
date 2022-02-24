import React from "react";
import { Link } from "react-router-dom";
import "../Landing/landing.css";

export default function LandingPage() {
  return (
    <div className="conteinerL">
      <Link to="/home">
        <button className="btnL">START</button>
      </Link>
    </div>
  );
}
