import React from "react";
import "../Paginado/paginado.css";

export default function ({ pokmnPerPage, totalPokmn, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPokmn / pokmnPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <>
      {pageNumbers &&
        pageNumbers.map((number) => (
          <div key={number} className="page-item">
            <a onClick={() => paginate(number)} className="page-link">
              {number}
            </a>
          </div>
        ))}
    </>
  );
}
