import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

const passNoMatch = (
  <small className="text-danger">Tienes que ingresar una contraseña</small>
);

const allOk = (
  <small className="text-success">
    Cuenta borrada, gracias por haber participado de chilegigs !
  </small>
);

const errorFetch = (
  <small className="text-danger">Hubo un error de conexion</small>
);

const BorrarCuenta = () => {
  const { store, actions } = useContext(Context);

  //calve
  const [pass, setPass] = useState("");

  //validaciones
  const [match, setMatch] = useState(false);

  const [ok, setOk] = useState(false);

  //fetch
  const [error, setError] = useState(null);

  const [msg, setMsg] = useState("");

  let history = useHistory();

  function cambiarClave() {
    if (pass === "") {
      return setMatch(true);
    }
    let obj = {
      password: pass,
    };
    borrarCuenta(obj);
  }

  function borrarCuenta(obj) {
    fetch(`${store.fetchUrl}user/delete`, {
      method: "DELETE",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.msg) {
          setMsg(data.msg);
        } else {
          setMsg("");
          setOk(true);
          setTimeout(function () {
            actions.logOut();
            history.push("/");
          }, 3000);
        }
      })
      .catch((error) => {
        setError(error);
        console.log(error.message);
      });
  }

  return (
    <>
      <div ClassName="container">
        <div className="mb-2 mt-5">
          <span className="font-weight-bold">Borrar Cuenta</span>
        </div>
        <div ClassName="row">
          <div ClassName="col-sm-4">
            <label>Contraseña</label>
            <div ClassName="form-group pass_show">
              <input
                type="password"
                value={pass}
                ClassName="form-control"
                placeholder="Tu constraseña"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <span className="btn btn-primary mt-3" onClick={cambiarClave}>
              Enviar
            </span>
            <div className="d-flex flex-column mt-1">
              <div ClassName="col-sm-4">
                {match ? passNoMatch : null}
                {ok ? allOk : null}
                {error ? errorFetch : null}
                {msg.length > 0 ? (
                  <small className="text-danger">{msg}</small>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BorrarCuenta;
