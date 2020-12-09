// import "./elegircuenta.css";
import React, { useState } from "react";
const { Modal } = require("react-bootstrap");

const usernameWarning = (
  <small className="text-danger">
    Mínimo tres caractéres, alfanumérico y sin espacios
  </small>
);

const emailWarning = <small className="text-danger">Correo no es válido</small>;

const passNoMatch = (
  <small className="text-danger">Contraseñas no coinciden</small>
);
const passValid = (
  <small className="text-danger pl-2">
    Contraseñas con almenos una mayúscula, una minúscula y un número
  </small>
);
const CrearCuenta = ({
  titulo,
  con,
  ErrorDeConexion,
  roleID,
  CreateAccountFetch,
  errorMsg,
}) => {
  const [username, setUsername] = useState("");
  const [usernameVal, setUsernameVal] = useState(false);
  const [email, setEmail] = useState("");
  const [emailVal, setEmailVal] = useState(false);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [match, setMatch] = useState(false);
  const [passVal, setPassVal] = useState(false);

  function createAccount(e) {
    e.preventDefault();
    if (username.length < 3 || username.length > 50) {
      return setUsernameVal(true);
    }
    if (!/^(?!admin)^[a-zA-Z0-9]*$/gm.test(username)) {
      return setUsernameVal(true);
    }
    if (
      !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
      )
    ) {
      return setEmailVal(true);
    }
    if (email.length < 3 || email.length > 30) {
      return setEmailVal(true);
    }
    if (password1 !== password2) {
      return setMatch(true);
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password2)) {
      return setPassVal(true);
    }
    let emailCopy = email;
    if (emailCopy === "") {
      return setEmailVal(true);
    }
    setUsernameVal(false);
    setEmailVal(false);
    setMatch(false);
    setPassVal(false);
    let data = {
      username: username,
      email: emailCopy,
      password: password1,
      role: parseInt(roleID),
    };
    CreateAccountFetch(data);
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>{titulo}</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <div className="modal-body">
              <form>
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
                  {usernameVal ? usernameWarning : null}
                </div>
                <div className="form-group">
                  <i className="fa fa-at"></i>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo Electronico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required="required"
                  />
                  {emailVal ? emailWarning : null}
                </div>
                <div className="form-group">
                  <i className="fa fa-lock"></i>
                  <input
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    className="form-control"
                    placeholder="Contraseña"
                    required="required"
                  />
                  {match ? passNoMatch : null}
                  {passVal ? passValid : null}
                </div>
                <div className="form-group">
                  <i className="fa fa-lock"></i>
                  <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    className="form-control"
                    placeholder="Repetir contraseña"
                    required="required"
                  />
                  {match ? passNoMatch : null}
                  {passVal ? passValid : null}
                </div>
                <div className="form-group">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block btn-lg"
                    onClick={(e) => createAccount(e)}
                  />
                </div>
              </form>
            </div>
            {errorMsg !== "" ? (
              <span className="text-danger">{errorMsg}</span>
            ) : null}
            {con ? ErrorDeConexion : null}
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default CrearCuenta;
