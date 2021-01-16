import React, { useState } from "react";
import { Modal } from "react-bootstrap";
// import "../modal.css";

const Login = ({
  LoginFetch,
  errorMsg,
  con,
  ErrorDeConexion,
  ocultarLoginMostrarCuentas,
  exito,
  creacionExitosa,
  ocultarLoginMostrarRecuperar,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShown, setPasswordShown] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  function LoginFunction(e) {
    e.preventDefault();
    let data = {
      username: username,
      password: password,
    };
    LoginFetch(data);
  }

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Ingreso</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <div className="modal-body">
              {exito ? creacionExitosa : null}
              <form className="mt-1">
                <div className="form-group">
                  <i className="fa fa-user"></i>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre de usuario"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required="required"
                  />
                </div>
                <div className="form-group">
                  <i className="fa fa-lock"></i>
                  <input
                    type={passwordShown ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control"
                    placeholder="Contraseña"
                    required="required"
                  />
                  <i
                    className="far fa-eye"
                    onClick={togglePasswordVisiblity}
                  ></i>
                </div>

                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={(e) => LoginFunction(e)}
                  />
                </div>
              </form>
              <div className="texto-crea-cuenta">
                <span
                  onClick={ocultarLoginMostrarCuentas}
                  className="texto-crea-cuenta"
                >
                  o crea una cuenta
                </span>
              </div>
              {errorMsg !== "" ? (
                <span className="text-danger">{errorMsg}</span>
              ) : null}
              {con ? ErrorDeConexion : null}
            </div>
            <Modal.Footer>
              <span
                href="#"
                onClick={ocultarLoginMostrarRecuperar}
                className="texto-crea-cuenta"
              >
                ¿olvidaste tu contraseña?
              </span>
            </Modal.Footer>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default Login;
