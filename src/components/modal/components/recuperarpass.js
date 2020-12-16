import React, { useState } from "react";
const { Modal } = require("react-bootstrap");

const Recuperar = ({ errorMsg, con, ErrorDeConexion, recoverPassword }) => {
  const [email, setEmail] = useState("");

  function sendEmail(e) {
    e.preventDefault();
    let data = { email: email };
    recoverPassword(data);
  }
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Recuperar constraseña</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-dialog modal-login">
          <div className="modal-content">
            <div className="modal-body">
              <form>
                <div className="d-flex justify-content-center flex-column">
                  <span className="text-center m-4">
                    Ingresa tu correo electronico
                  </span>
                  <div className="form-group">
                    <i className="fa fa-at"></i>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="E-mail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required="required"
                    />
                  </div>
                </div>
                <input
                  type="submit"
                  className="btn btn-primary btn-block btn-lg"
                  onClick={(e) => sendEmail(e)}
                />
                {errorMsg !== "" ? (
                  <span className="text-danger">{errorMsg}</span>
                ) : null}
                {con ? ErrorDeConexion : null}
              </form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default Recuperar;
