import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
import { Context } from "../../store/appContext";

const passValid = (
  <small className="text-danger pl-2">
    Contraseñas con almenos una mayúscula, una minúscula y un número
  </small>
);

const passNoMatch = (
  <small className="text-danger">Contraseñas no coinciden</small>
);

const allOk = (
  <small className="text-success">
    Contraseña modificada, por favor vuelve a ingresar...
  </small>
);

const errorFetch = (
  <small className="text-danger">Hubo un error de conexion</small>
);

const CambiarClaveEnCuenta = () => {
  const { store, actions } = useContext(Context);

  //clave antigua

  const [oldPass, setOldPass] = useState("");

  //calves nuevas
  const [pass1, setPass1] = useState("");
  const [pass2, setPass2] = useState("");

  //validaciones
  const [match, setMatch] = useState(false);
  const [passVal, setPassVal] = useState(false);
  const [ok, setOk] = useState(false);

  //fetch
  const [error, setError] = useState(null);

  const [msg, setMsg] = useState("");

  let history = useHistory();

  function cambiarClave() {
    if (oldPass === "") {
      return setPassVal(true);
    }
    if (pass1 !== pass2) {
      setPassVal(false);
      return setMatch(true);
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(pass2)) {
      setMatch(false);
      return setPassVal(true);
    }
    let obj = {
      old_password: oldPass,
      new_password: pass1,
    };
    console.log(obj);
    mandarNuevaClave(obj);
  }

  function mandarNuevaClave(obj) {
    fetch(`${store.fetchUrl}account/update/password`, {
      method: "PUT",
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
          setMatch(false);
          setPassVal(false);
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
        <div className="mb-2">
          <span className="font-weight-bold">Cambiar Contraseña</span>
        </div>
        <div ClassName="row">
          <div ClassName="col-sm-4">
            <label>Contraseña Antigua</label>
            <div ClassName="form-group pass_show">
              <input
                type="password"
                value={oldPass}
                ClassName="form-control"
                placeholder="Clave antigua"
                onChange={(e) => setOldPass(e.target.value)}
              />
            </div>
            <label>Nueva Contraseña</label>
            <div ClassName="form-group pass_show">
              <input
                type="password"
                value={pass1}
                ClassName="form-control"
                placeholder="Nueva clave"
                onChange={(e) => setPass1(e.target.value)}
              />
            </div>
            <label>Confirmar Nueva Constraseña</label>
            <div ClassName="form-group pass_show">
              <input
                type="password"
                value={pass2}
                ClassName="form-control"
                placeholder="Confirmar clave"
                onChange={(e) => setPass2(e.target.value)}
              />
            </div>
            <span className="btn btn-primary mt-3" onClick={cambiarClave}>
              Enviar
            </span>
            <div className="d-flex flex-column mt-1">
              <div className="col-sm-4">
                {match ? passNoMatch : null}
                {passVal ? passValid : null}
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

export default CambiarClaveEnCuenta;
