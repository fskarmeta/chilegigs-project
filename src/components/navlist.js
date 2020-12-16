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
              <i class="fas fa-user-edit"></i> Editar Perfil
            </Link>
          </li>
        ) : null}
        {store.role === "client" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/client/edit`}>
              <i class="fas fa-user-edit"></i> Editar Perfil
            </Link>
          </li>
        ) : null}
        {store.role === "dj" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/dj/gigs`}>
              <i class="fas fa-list-alt"></i> Gigs
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
              <i class="fas fa-id-badge"></i> Perfil
            </Link>
          </li>
        ) : null}
        {store.role === "client" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/client/profile/${store.username}`}>
              <i class="fas fa-id-badge"></i> Perfil
            </Link>
          </li>
        ) : null}
        {store.LoggedIn ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/account`}>
              <i class="fas fa-cog"></i> Cuenta
            </Link>
          </li>
        ) : null}
        {store.role === "admin" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/admin`}>
              <i class="fas fa-tools"></i> Admin
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
            <span className="nav-link">
              <i class="fas fa-sign-out-alt"></i> Log Out
            </span>
          </li>
        ) : (
          <ModalGeneral titulo={"Log in"} />
        )}
      </ul>
    </div>
  );
};
