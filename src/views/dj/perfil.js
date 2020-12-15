import React, { useEffect, useState, useContext } from "react";
import DjPerfil from "../../components/dj/perfil/perfil";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams,
} from "react-router-dom";
import { ejemploPerfil } from "../../placeholder/ejemploperfil";
import Spinner from "../../components/home/spinner";

const mensajeLogin = (
  <div>
    Hola! Tienes que ingresar como usuario para poder ver este contenido
  </div>
);

const perfilInactivoMensaje = <div>Este perfil aún no está activo</div>;

export const DjProfile = () => {
  const { store } = useContext(Context);
  const [profile, setProfile] = useState(ejemploPerfil);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [logMsg, setLogMsg] = useState(false);
  const [perfilInactivo, setPerfilInactivo] = useState(false);
  const [datosPrivados, setDatosPrivados] = useState(false);

  let { username } = useParams();

  let history = useHistory();

  useEffect(() => {
    if (!store.LoggedIn) {
      setLogMsg(true);
    } else {
      fetchProfile(username);
    }
  }, [store.LoggedIn]);

  useEffect(() => {
    for (let gig of store.gigs) {
      if (gig.dj_id === profile.dj_id) {
        setDatosPrivados(true);
      }
    }
  }, [profile]);

  const fetchProfile = (username) => {
    fetch(`${store.fetchUrl}dj/profile/username/${username}`, {
      method: "GET",
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
          setIsLoaded(true);
          setLogMsg(false);
          setMsg(data.msg);
        }
        if (data.status === "inactive") {
          setPerfilInactivo(true);
          setIsLoaded(true);
        } else {
          setLogMsg(false);
          setMsg(null);
          setError(null);
          setProfile(data);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoaded(true);
        setError(error);
      });
  };
  if (logMsg) {
    return (
      <>
        {mensajeLogin}
        <Spinner />
      </>
    );
  }
  if (error) {
    return <div>Hubo un problema de conexion</div>;
  } else if (!isLoaded) {
    return <Spinner />;
  } else if (msg) {
    return <div>{msg}</div>;
  } else if (perfilInactivo) {
    return (
      <>
        {perfilInactivoMensaje}
        <Spinner />
      </>
    );
  } else {
    return (
      <>
        <DjPerfil fetchProfile={profile} datosPrivados={datosPrivados} />
      </>
    );
  }
};
