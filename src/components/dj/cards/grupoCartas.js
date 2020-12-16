import React, { useEffect, useState, useContext } from "react";
import ClientPerfil from "../../../components/cliente/perfil/clientperfil";
import DjProfileCard from "../../../components/dj/perfil/components_perfil/card";
import { useHistory, Link } from "react-router-dom";
import { Context } from "../../../store/appContext";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    useParams,
} from "react-router-dom";
import Spinner from "../../../components/home/spinner";


const GrupoCartas = () => {
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
                        <div className="mb-5"><h3>Nuestros Dj's</h3></div>
                    <div className="col-md-12">
                        <div className="row">
                            
                            {!!profiles && profiles.map((profile) => {
                                return (

                                    <div className="card col-md-3" style={{ width: "16rem" }} key={profile.id}>
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
                                            <Link className="btn btn-primary" to={`/dj/profile/${profile.username}`} >Ver perfil</Link>

                                        </div>

                                    </div>
                                )
                            })
                            }
                        </div>
                    </div>

                </div>

            </>
        );
    }
};

export default GrupoCartas;