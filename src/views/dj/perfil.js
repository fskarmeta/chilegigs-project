import React, { useEffect, useState, useContext } from "react";
import DjPerfil from "../../components/dj/perfil/perfil";
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

export const DjProfile = () => {
  const { store } = useContext(Context);
  const [profile, setProfile] = useState(ejemploPerfil);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [logMsg, setLogMsg] = useState(false);
  const [perfilInactivo, setPerfilInactivo] = useState(false);
  const [datosPrivados, setDatosPrivados] = useState(false);
  const [gigs, setGigs] = useState(null);
  const [feedbacks, setFeedbacks] = useState(null);

  let { username } = useParams();

  useEffect(() => {
    if (!store.LoggedIn) {
      setLogMsg(true);
    } else {
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
            setProfile(data.profile);
            setGigs(data.gigs);
            setFeedbacks(data.feedbacks);
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

  useEffect(() => {
    for (let gig of store.gigs) {
      if (
        gig.dj_id === profile.dj_id ||
        gig.username_cliente === store.username
      ) {
        setDatosPrivados(true);
      }
    }
    if (profile.dj_id === store.cuenta.id || store.role === "admin") {
      setDatosPrivados(true);
    }
  }, [profile, store.cuenta.id, store.gigs, store.role, store.username]);

  // const fetchProfile = (username) => {
  //   fetch(`${store.fetchUrl}dj/profile/username/${username}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${store.token}`,
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.msg) {
  //         setIsLoaded(true);
  //         setLogMsg(false);
  //         setMsg(data.msg);
  //       }
  //       if (data.status === "inactive") {
  //         setPerfilInactivo(true);
  //         setIsLoaded(true);
  //       } else {
  //         setLogMsg(false);
  //         setMsg(null);
  //         setError(null);
  //         setProfile(data.profile);
  //         setGigs(data.gigs);
  //         setIsLoaded(true);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error.message);
  //       setIsLoaded(true);
  //       setError(error);
  //     });
  // };

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
        <DjPerfil
          fetchProfile={profile}
          datosPrivados={datosPrivados}
          gigs={gigs}
          feedback={feedbacks}
        />
      </>
    );
  }
};
