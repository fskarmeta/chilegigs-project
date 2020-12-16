import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../../store/appContext";
import { useHistory } from "react-router-dom";
import { Modal, Table } from "react-bootstrap";
import Spinner from "../../home/spinner";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const optionsHoras = { hour: "2-digit", minute: "2-digit" };

const ListaContrataciones = () => {
  const { store, actions } = useContext(Context);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gigs, setGigs] = useState(store.gigs);

  let history = useHistory();

  useEffect(() => {
    if (!store.LoggedIn) {
      setError(true);
    } else {
      setError(null);
      fetchGigs();
    }
  }, [store.LoggedIn]);

  function goToGig(id) {
    history.push(`/gigs/${id}`);
  }

  const fetchGigs = () => {
    fetch(`${store.fetchUrl}account/gig`, {
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
        // console.log(data);
        setIsLoaded(true);
        setGigs(data);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoaded(true);
        setError(error);
      });
  };

  if (error) {
    return <div>Hubo un error de conexión</div>;
  } else if (!isLoaded) {
    return (
      <div>
        <Spinner />
      </div>
    );
  } else {
    return (
      <>
        <Table striped borderless hover>
          <thead>
            <tr>
              <th>Día</th>
              <th>Hora llegada DJ</th>
              <th>DJ</th>
              <th>Evento</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {!!gigs &&
              gigs.map((gig) => {
                return (
                  <tr key={gig.id}>
                    <td>
                      {new Date(gig.dia_evento).toLocaleDateString(
                        "es-CL",
                        options
                      )}
                    </td>
                    <td>
                      {new Date(gig.hora_llegada).toLocaleString(
                        "es-CL",
                        optionsHoras
                      )}
                    </td>
                    <td>
                      <Link to={`/dj/profile/${gig.username_dj}`}>
                        {gig.username_dj}
                      </Link>
                    </td>
                    <td>{gig.nombre_evento}</td>
                    <td>{gig.estado}</td>
                    <td>
                      <span
                        className="btn btn-primary"
                        onClick={() => goToGig(gig.id)}
                      >
                        Detalles
                      </span>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </>
    );
  }
};

export default ListaContrataciones;
