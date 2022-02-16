import React from "react";
import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div>
      <h1>Aca va una pokebola</h1>
      <Link to="/home">
        <button>home</button>
      </Link>
    </div>
  );
}
