import React, { useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import ModalGeneral from "./modal/modal";

export const Navlist = () => {
  const { store, actions } = useContext(Context);

  //Mensajes no leídos por el usuario actual
  const [notReaded, setNotReaded] = useState(false);
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (store.role === "dj") {
      let counter = 0;
      for (let gig of store.gigs) {
        if (!gig.leido_por_dj) {
          counter++;
        }
        setNumber(counter);
      }
      if (counter > 0) {
        setNotReaded(true);
      }
    }
    if (store.role === "client") {
      let counter = 0;
      for (let gig of store.gigs) {
        if (!gig.leido_por_cliente) {
          counter++;
        }
        setNumber(counter);
      }
      if (counter > 0) {
        setNotReaded(true);
      }
    }
  });

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
            <Link className="nav-link" to={`/dj/gigs`}>
              <i class="fas fa-list-alt"></i> Gigs{" "}
              {notReaded ? (
                <span className="animate__animated animate__bounce">
                  {number}
                </span>
              ) : null}
            </Link>
          </li>
        ) : null}
        {store.role === "client" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/client/contrataciones`}>
              <i class="fas fa-list-alt"></i> Contrataciones{" "}
              {notReaded ? number : null}
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
        {store.role === "dj" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/dj/edit`}>
              <i class="fas fa-user-edit"></i> Editar
            </Link>
          </li>
        ) : null}
        {store.role === "client" ? (
          <li className="nav-item">
            <Link className="nav-link" to={`/client/edit`}>
              <i class="fas fa-user-edit"></i> Editar
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
