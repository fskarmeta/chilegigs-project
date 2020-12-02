import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navlist = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        {store.nav.map((link, index) => (
          <li className="nav-item active" key={index}>
            <Link className="nav-link" to={link.to}>
              {`${link.label}`}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
