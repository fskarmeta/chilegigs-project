import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ModalGeneral from "./modal/modal";

export const Navlist = () => {
  const { store, actions } = useContext(Context);
  let history = useHistory();
  return (
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to={`../profile/${store.username}`}>
            Perfil DJ
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to={`../client/profile/${store.username}`}>
            Perfil Cliente
          </Link>
        </li>
        {store.nav.map((link, index) => (
          <li className="nav-item" key={index}>
            <Link className="nav-link" to={link.to}>
              {`${link.label}`}
            </Link>
          </li>
        ))}
        {store.LoggedIn ? (
          <li
            className="nav-item login-link"
            onClick={() => {
              actions.logOut();
              history.push("/");
            }}
          >
            <span className="nav-link">Log Out</span>
          </li>
        ) : (
          <ModalGeneral titulo={"Log in"} />
        )}
      </ul>
    </div>
  );
};
