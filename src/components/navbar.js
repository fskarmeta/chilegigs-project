import React, { useEffect, useContext, useState } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { Navlist } from "./navlist";

export const Navbar = () => {
  // const { store, actions } = useContext(Context);

  // const [status, setStatus] = useState(store.perfil_status);

  // let history = useHistory();

  // useEffect(() => {
  //   setStatus(store.perfil_status);
  // }, [store]);

  // useEffect(() => {
  //   if (status === "inactive") {
  //     history.push("/dj/edit");
  //   }
  // }, [status]);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link className="navbar-brand" to="/">
          <span>chilegigs</span>
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
