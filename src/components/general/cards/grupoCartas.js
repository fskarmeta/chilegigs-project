import React, { useEffect, useState, useContext } from "react";
import DjProfileCard from "../../../components/dj/perfil/components_perfil/card";
import { Context } from "../../../store/appContext";
import Spinner from "../../../components/home/spinner";

const GrupoCartas = ({ electronica, groovy, comercial, tecnica, servicio }) => {
  const { store } = useContext(Context);
  const [profiles, setProfiles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState(null);
  const [logMsg, setLogMsg] = useState(false);

  useEffect(() => {
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
          return setMsg(data.msg);
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
  }, [store.LoggedIn, store.fetchUrl]);

  // const fetchProfiles = () => {
  //   fetch(`${store.fetchUrl}profiles`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       if (data.msg) {
  //         setIsLoaded(true);
  //         setLogMsg(false);
  //         return setMsg(data.msg);
  //       }

  //       setLogMsg(false);
  //       setMsg(null);
  //       setError(null);
  //       setProfiles(data);
  //       setIsLoaded(true);
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
        <div className="container-fluid mt-5">
          {/* <div className="mb-5">
            <h3>Catálogo</h3>
          </div> */}
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
                        className="card border-0 col-xl-2 col-lg-3 col-md-4 col-sm-6 col-xs-12 mt-2"
                        // style={{ width: "16rem" }}
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
                          username={profile.username}
                        />
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
