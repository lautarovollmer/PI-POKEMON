import React from "react";
import { Link } from "react-router-dom";
import "../Nav/nav.css";

export default function Nav() {
  return (
    <>
      <div className="nav">
        <Link className="crear" to="/create">
          <h3>Create Pokemon</h3>
        </Link>
      </div>
    </>
  );
}
