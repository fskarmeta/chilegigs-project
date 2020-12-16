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
          <Link className="nav-link" to={`/catalogo`}>
            <i class="fas fa-compact-disc"></i> Dj's
          </Link>
        </li>
        {store.role === "dj" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/dj/edit`}>
              Editar Perfil DJ
            </Link>
          </li>
        ) : null}
        {store.role === "client" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/client/edit`}>
              Editar Perfil Cliente
            </Link>
          </li>
        ) : null}
        {store.role === "dj" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/dj/gigs`}>
              Gigs
            </Link>
          </li>
        ) : null}
        {store.role === "client" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/client/contrataciones`}>
              Contrataciones
            </Link>
          </li>
        ) : null}
        {store.role === "dj" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/dj/profile/${store.username}`}>
              Perfil DJ
            </Link>
          </li>
        ) : null}
        {store.role === "client" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/client/profile/${store.username}`}>
              Perfil Cliente
            </Link>
          </li>
        ) : null}
        {store.LoggedIn ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/account`}>
              Cuenta
            </Link>
          </li>
        ) : null}
        {store.role === "admin" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/admin`}>
              Admin
            </Link>
          </li>
        ) : null}
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
