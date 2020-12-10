import React, { useState, useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import { Modal } from "react-bootstrap";
import Login from "./components/login";
import TipoDeCuenta from "./components/tipocuenta";
import LoginExitoso from "./components/loginexitoso";
import "./components/loginstyle.css";
import "./modal.css";
import CrearCuenta from "./components/crearcuenta";

// OJO ACA ESTAN LOS FETCH PARA LOGEARSE Y CREAR CUENTA !

const ErrorDeConexion = (
  <small className="text-danger">Hubo un error de conexión</small>
);

const creacionExitosa = (
  <small className="text-success">
    Cuenta creada exitosamente, porfavor ingresa con tu cuenta
  </small>
);
const mostrar = { display: "block" };
const ocultar = { display: "none" };

const ModalGeneral = ({ titulo }) => {
  const { store, actions } = useContext(Context);

  //mostrar o no modal
  const [show, setShow] = useState(false);

  const [exito, setExito] = useState(false);
  //mensaje de error del server
  const [errorMsg, setErrorMsg] = useState("");

  // si hubo errror de conexion
  const [con, setCon] = useState(false);

  //abrir modal
  const handleShow = () => setShow(true);

  //mostrar login
  const [loginComp, setLoginComp] = useState(true);

  // mostrar tipos de cuentas
  const [tipoCuentaComp, setTipoCuentaComp] = useState(false);

  // mostrar crear cuenta de DJ

  const [crearCuentaDJComp, setCrearCuentaDJComp] = useState(false);

  // mostrar crear cuenta de Cliente

  const [crearCuentaClientComp, setCrearCuentaClientComp] = useState(false);

  // mostrar modal login exitoso

  const [exitosoComp, setExitosoComp] = useState(false);

  // const [status, setStatus] = useState(store.perfil_status);

  // useEffect(() => {
  //   setStatus(store.perfil_status);
  // }, [loginComp]);

  function ocultarLoginMostrarCuentas() {
    setLoginComp(false);
    setTipoCuentaComp(true);
    setCon(false);
  }

  function mostrarCuentaDj() {
    setTipoCuentaComp(false);
    setCrearCuentaClientComp(false);
    setCrearCuentaDJComp(true);
    setCon(false);
  }

  function mostrarCuentaCliente() {
    setTipoCuentaComp(false);
    setCrearCuentaDJComp(false);
    setCrearCuentaClientComp(true);
    setCon(false);
  }

  //cerrar modal
  const handleClose = () => {
    setShow(false);
    setTipoCuentaComp(false);
    setCrearCuentaDJComp(false);
    setCrearCuentaClientComp(false);
    setCon(false);
    setErrorMsg("");
    setExito(false);
    setExitosoComp(false);
    setLoginComp(true);
  };

  let history = useHistory();
  function routeAfterLogin() {
    console.log("hola desde rutas");
    if (store.perfil_status === "inactive") {
      console.log("inactivo");
      if (store.role === "dj") {
        history.push("/dj/edit");
        actions.loginToTrue();
        handleClose();
        setExitosoComp(false);
      }
      if (store.role === "client") {
        history.push("/client/edit");
        actions.loginToTrue();
        handleClose();
        setExitosoComp(false);
      }
    } else {
      actions.loginToTrue();
      handleClose();
      setExitosoComp(false);
    }
    // handleClose();
    // setExitosoComp(false);
  }

  // fetch login
  //objeto que pasa acá se compone por {username: "" , password: ""}
  function LoginFetch(obj) {
    fetch(`${store.fetchUrl}user/login`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.msg) {
          setErrorMsg(data.msg);
        } else {
          actions.dataFromLogin(data);
          setErrorMsg("");

          setExitosoComp(true);
          setLoginComp(false);

          //mandar al home
        }
      })
      .catch((error) => {
        console.log(error.message);
        setCon(true);
      });
  }

  //fetch crear cuenta
  //objeto que pasa acá se compone por {username: "" , password: ""}
  function CreateAccountFetch(obj) {
    console.log(obj);
    fetch(`${store.fetchUrl}user/register`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.msg) {
          console.log("Error de server");
          setErrorMsg(data.msg);
        } else {
          console.log(data);
          console.log("Cuenta Creada");
          setErrorMsg("");
          setExito(true);
          setCrearCuentaDJComp(false);
          setCrearCuentaClientComp(false);
          setLoginComp(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setCon(true);
      });
  }

  return (
    <>
      <li className="nav-item login-link" onClick={handleShow}>
        <span className="nav-link">{titulo}</span>
      </li>

      <Modal show={show} onHide={handleClose}>
        <div style={loginComp ? mostrar : ocultar}>
          <Login
            exito={exito}
            creacionExitosa={creacionExitosa}
            handleClose={handleClose}
            LoginFetch={LoginFetch}
            errorMsg={errorMsg}
            con={con}
            ErrorDeConexion={ErrorDeConexion}
            ocultarLoginMostrarCuentas={ocultarLoginMostrarCuentas}
          />
        </div>
        <div style={tipoCuentaComp ? mostrar : ocultar}>
          <TipoDeCuenta
            mostrarCuentaDj={mostrarCuentaDj}
            mostrarCuentaCliente={mostrarCuentaCliente}
          />
        </div>
        <div style={crearCuentaDJComp ? mostrar : ocultar}>
          <CrearCuenta
            titulo={"Crear cuenta DJ"}
            errorMsg={errorMsg}
            con={con}
            ErrorDeConexion={ErrorDeConexion}
            roleID={"2"}
            CreateAccountFetch={CreateAccountFetch}
          />
        </div>
        <div style={crearCuentaClientComp ? mostrar : ocultar}>
          <CrearCuenta
            titulo={"Crear cuenta Cliente"}
            errorMsg={errorMsg}
            con={con}
            ErrorDeConexion={ErrorDeConexion}
            roleID={"3"}
            CreateAccountFetch={CreateAccountFetch}
          />
        </div>
        <div style={exitosoComp ? mostrar : ocultar}>
          <LoginExitoso routeAfterLogin={routeAfterLogin} />
        </div>
      </Modal>
    </>
  );
};

export default ModalGeneral;
