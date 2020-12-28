import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams, useHistory } from "react-router-dom";
import DjGig from "../../components/gigs/gig_dj";
import ClientGig from "../../components/gigs/gig_cliente";

// placeholder

const optionsHoras = { hour: "2-digit", minute: "2-digit" };

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const warning = (
  <small className="row text-danger ml-2">
    Tienes que escribir un mensaje para poder realizar una acción
  </small>
);

const cambios = (
  <small className="text-success">Gracias! Ahora espera una respueta.</small>
);

const mensajeLogin = (
  <div>
    Hola! Tienes que ingresar como usuario para poder ver este contenido
  </div>
);

const GigComponent = () => {
  const { store } = useContext(Context);
  const [gig, setGig] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [logMsg, setLogMsg] = useState(false);

  let history = useHistory();
  let { id } = useParams();

  useEffect(() => {
    fetch(`${store.fetchUrl}gig/${id}`, {
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
        } else {
          setLogMsg(false);
          setMsg(null);
          setError(null);
          setGig(data);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoaded(true);
        setError(error);
      });
  }, [id, store.fetchUrl, store.token]);

  function previousPage() {
    setTimeout(function () {
      history.goBack();
    }, 1000);
  }

  function fetchGig() {
    fetch(`${store.fetchUrl}gig/${id}`, {
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
        } else {
          setLogMsg(false);
          setMsg(null);
          setError(null);
          setGig(data);
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoaded(true);
        setError(error);
      });
  }

  function updateGig(obj, id) {
    fetch(`${store.fetchUrl}gig/update/${id}`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }
  if (logMsg) {
    return (
      <>
        {mensajeLogin}
        <small>Cargando...</small>;
      </>
    );
  }
  if (error) {
    return <div>Hubo un problema de conexion</div>;
  } else if (!isLoaded) {
    return <small>Cargando...</small>;
  } else if (msg) {
    return <div>{msg}</div>;
  } else {
    return (
      <div className="container">
        {store.role === "dj" || store.role === "admin" ? (
          <DjGig
            gig={gig}
            option={options}
            optionsHoras={optionsHoras}
            warning={warning}
            cambios={cambios}
            updateGig={updateGig}
            id={id}
            fetchGig={fetchGig}
            previousPage={previousPage}
          />
        ) : store.role === "client" ? (
          <ClientGig
            gig={gig}
            option={options}
            optionsHoras={optionsHoras}
            warning={warning}
            cambios={cambios}
            updateGig={updateGig}
            id={id}
            fetchGig={fetchGig}
            previousPage={previousPage}
          />
        ) : null}
      </div>
    );
  }
};

export default GigComponent;
