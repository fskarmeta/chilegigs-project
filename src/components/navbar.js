import React, { useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Navlist } from "./navlist";
import { useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import "./styles/navbar.css";

export const Navbar = () => {
  const { store } = useContext(Context);
  let history = useHistory();

  useEffect(() => {
    if (store.perfil_status === "inactive") {
      if (store.role === "dj") {
        history.push("/dj/edit");
      }
      if (store.role === "client") {
        history.push("/client/edit");
      }
    }
  }, [history, store.perfil_status, store.role]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <span>CHILEGIGS</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <Navlist />
      </nav>
    </>
  );
};
