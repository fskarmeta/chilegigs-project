import React, { useEffect, useState, useContext } from "react";
import ClientPerfil from "../../components/cliente/perfil/clientperfil";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { ejemploPerfil } from "../../placeholder/ejemploperfil";
import Spinner from "../../components/home/spinner";

const mensajeLogin = (
  <div>
    Hola! Tienes que ingresar como usuario para poder ver este contenido
  </div>
);

const perfilInactivoMensaje = <div>Este perfil aún no está activo</div>;

export const ClientProfile = () => {
  const { store } = useContext(Context);
  const [profile, setProfile] = useState(ejemploPerfil);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [logMsg, setLogMsg] = useState(false);
  const [perfilInactivo, setPerfilInactivo] = useState(false);
  const [feedbacks, setFeedback] = useState(null);
  let { username } = useParams();

  useEffect(() => {
    if (!store.LoggedIn) {
      setLogMsg(true);
    } else {
      fetch(`${store.fetchUrl}client/profile/username/${username}`, {
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
            setProfile(data.profile);
            setFeedback(data.feedbacks);
            setIsLoaded(true);
          }
        })
        .catch((error) => {
          console.log(error.message);
          setIsLoaded(true);
          setError(error);
        });
    }
  }, [store.LoggedIn, store.fetchUrl, store.token, username]);

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
        <ClientPerfil fetchProfile={profile} feedback={feedbacks} />
      </>
    );
  }
};
