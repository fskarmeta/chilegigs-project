import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Badge } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Context } from "../../../store/appContext";
import Spinner from "../../home/spinner";
import { colorState } from "../../general/helper";

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const optionsHoras = { hour: "2-digit", minute: "2-digit" };

const ListaGigs = () => {
  const { store } = useContext(Context);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [gigs, setGigs] = useState(store.gigs);

  let history = useHistory();

  useEffect(() => {
    if (!store.LoggedIn) {
      setError(true);
    } else {
      setError(null);
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
    }
  }, [store.LoggedIn, store.fetchUrl, store.token]);

  function goToGig(id) {
    history.push(`/gigs/${id}`);
  }

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
              <th>Hora llegada</th>
              <th>Cliente</th>
              <th>Evento</th>
              <th>Estado</th>
              <th>Detalles</th>
            </tr>
          </thead>
          <tbody>
            {!!gigs &&
              gigs.map((gig) => {
                return (
                  <tr
                    key={gig.id}
                    style={{
                      backgroundColor: `${gig.leido_por_dj ? "" : "#DAEAD1"}`,
                    }}
                  >
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
                      <Link to={`/client/profile/${gig.username_cliente}`}>
                        {gig.username_cliente}
                      </Link>
                    </td>
                    <td>{gig.nombre_evento}</td>
                    <td>
                      <Badge variant={`${colorState(gig.estado)}`}>
                        {gig.estado}
                      </Badge>
                    </td>
                    <td>
                      <span
                        className="btn btn-primary"
                        onClick={() => goToGig(gig.id)}
                      >
                        Detalles
                      </span>
                      {new Date(new Date(gig.dia_evento).getTime() + 86400000) <
                        new Date() && !gig.feedback_dj ? (
                        <Link
                          className="btn btn-success"
                          to={`/feedback/${gig.id}`}
                        >
                          Feedback
                        </Link>
                      ) : null}
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

export default ListaGigs;
