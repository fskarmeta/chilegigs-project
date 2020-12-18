import React, { useEffect, useState, useContext } from "react";
import DjProfileCard from "../../../components/dj/perfil/components_perfil/card";
import { useHistory, Link } from "react-router-dom";
import { Context } from "../../../store/appContext";
import Spinner from "../../../components/home/spinner";

const GrupoCartas = ({ electronica, groovy, comercial, tecnica, servicio }) => {
  const { store, actions } = useContext(Context);
  const [profiles, setProfiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [logMsg, setLogMsg] = useState(false);

  useEffect(() => {
    fetchProfiles();
  }, [store.LoggedIn]);

  let history = useHistory();

  const fetchProfiles = () => {
    fetch(`${store.fetchUrl}profiles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

        setLogMsg(false);
        setMsg(null);
        setError(null);
        setProfiles(data);
        setIsLoaded(true);
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
  } else {
    return (
      <>
        <div className="container mt-5">
          <div className="mb-5">
            <h3>Catálogo</h3>
          </div>
          <div className="col-md-12">
            <div className="row">
              {!!profiles &&
                profiles
                  .filter((profile) =>
                    electronica === ""
                      ? profile
                      : profile.generos.includes(electronica)
                  )
                  .filter((profile) =>
                    groovy === "" ? profile : profile.generos.includes(groovy)
                  )
                  .filter((profile) =>
                    comercial === ""
                      ? profile
                      : profile.generos.includes(comercial)
                  )
                  .filter((profile) =>
                    tecnica === "" ? profile : profile.tecnica.includes(tecnica)
                  )
                  .filter((profile) =>
                    servicio === ""
                      ? profile
                      : profile.servicios.includes(servicio)
                  )
                  .map((profile) => {
                    return (
                      <div
                        className="card col-md-3 mt-2"
                        //   style={{ width: "16rem" }}
                        key={profile.id}
                      >
                        <DjProfileCard
                          imagen={profile.imagen}
                          artista={profile.artista}
                          ciudad={profile.ciudad}
                          pais={profile.pais}
                          rating={profile.suma_rating}
                          contrataciones={profile.contrataciones}
                          tecnica={profile.tecnica}
                          generos={profile.generos}
                          instagram={profile.instagram}
                          soundcloud={profile.soundcloud}
                          mixcloud={profile.mixcloud}
                        />
                        <div className="d-flex justify-content-center">
                          <Link
                            className="btn btn-primary m-2"
                            to={`/dj/profile/${profile.username}`}
                          >
                            Ver perfil
                          </Link>
                        </div>
                      </div>
                    );
                  })}
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default GrupoCartas;
