import React, { useContext } from "react";

import { Context } from "../../../store/appContext";

const { Modal } = require("react-bootstrap");

const LoginExitoso = ({ routeAfterLogin }) => {
  const { store } = useContext(Context);
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>¡Login exitoso! Bienvenido {store.username}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <span className="btn btn-success" onClick={() => routeAfterLogin()}>
            Continuar
          </span>
        </div>
      </Modal.Body>
    </>
  );
};

export default LoginExitoso;
