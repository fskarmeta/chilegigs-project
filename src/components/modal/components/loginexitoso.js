import { Redirect, useHistory, useContext } from "react-router-dom";
import { Context } from "../../../store/appContext";

const { Modal } = require("react-bootstrap");

const LoginExitoso = ({ routeAfterLogin }) => {
  //   const { store, actions } = useContext(Context);

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Login Exitoso</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span className="btn btn-success" onClick={() => routeAfterLogin()}>
          Continuar
        </span>
      </Modal.Body>
    </>
  );
};

export default LoginExitoso;
