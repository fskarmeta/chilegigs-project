import React, { useState, useContext } from "react";
// import { ejemploPerfil } from "../../../placeholder/ejemploperfil";
import { Context } from "../../../store/appContext";
import { Modal, Button } from "react-bootstrap";
import Mix from "./components_perfil/mix";
import DjProfileCard from "./components_perfil/card";
import Bio from "./components_perfil/bio";
import GeneralEspectaculo from "./components_perfil/general_espectaculo";
import RequisitosDj from "./components_perfil/requisitos";
import DatosPersonales from "./components_perfil/datos";
import Fechas from "./components_perfil/fechas";
import Booking from "../../gigs/booking/bookinicial";
import Mensajes from "./components_perfil/mensajes";

const DjPerfil = ({ fetchProfile, datosPrivados, gigs, feedback }) => {
  const [perfil] = useState(fetchProfile);
  const { store } = useContext(Context);

  // para cuando tengamos gigs y queramos renderear los datos personales

  const [alert, setAlert] = useState(false);
  //

  const warning = (
    <small className="text-danger text-center">
      Solamente clientes con cuentas activas pueden hacer booking!
    </small>
  );
  // Modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => {
    if (store.cuenta.role.id !== 3 || store.perfil.status === "inactive") {
      setAlert(true);
      setTimeout(function () {
        setAlert(false);
      }, 3000);
    } else {
      setShow(true);
    }
  };
  //

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Booking
            clientUsername={store.cuenta.username}
            clientId={store.cuenta.id}
            djUsername={perfil.username}
            djId={!!perfil && perfil.dj_id}
            fetchUrl={store.fetchUrl}
            token={store.token}
            artistName={!!perfil && perfil.artista}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            {perfil.agregar_cancion && perfil.agregar_cancion ? (
              <Mix mix={perfil.url_cancion} />
            ) : null}
          </div>

          <div className="col-md-4">
            <div>
              <DjProfileCard
                imagen={perfil.imagen}
                artista={perfil.artista}
                ciudad={perfil.ciudad}
                pais={perfil.pais}
                rating={perfil.suma_rating}
                contrataciones={perfil.contrataciones}
                tecnica={perfil.tecnica}
                generos={perfil.generos}
                instagram={perfil.instagram}
                soundcloud={perfil.soundcloud}
                mixcloud={perfil.mixcloud}
                username={perfil.username}
              />
              <div className="col-md-12">
                <span className="btn btn-dark w-100 mt-3" onClick={handleShow}>
                  Agenda este DJ aquí !
                </span>
                {alert ? warning : null}
                <Fechas gigs={gigs} />
              </div>
            </div>
          </div>
          <div className="col-md-8 mb-5">
            <Bio biografia={perfil.biografia} />
            <GeneralEspectaculo
              servicios={perfil.servicios}
              dur_min={perfil.dur_min}
              dur_max={perfil.dur_max}
              staff={perfil.staff}
              viajes={perfil.viajes}
              arriendo={perfil.arrienda_equipos}
            />
            <RequisitosDj
              equipos={!!perfil && perfil.requisitos.equipos}
              escenario={!!perfil && perfil.requisitos.escenario}
              foodanddrinks={!!perfil && perfil.requisitos.foodanddrinks}
            />
            <DatosPersonales
              datosPrivados={datosPrivados}
              nombre={perfil.datos.nombre}
              apellido={perfil.datos.apellido}
              nacionalidad={perfil.datos.nacionalidad}
              celular={perfil.datos.celular}
              rut={perfil.datos.rut}
              calle={perfil.datos.calle}
              numero={perfil.datos.numero}
              ciudad={perfil.datos.ciudad}
              region={perfil.datos.region}
              pais={perfil.datos.pais}
            />
            <Mensajes mensajes={feedback} />
          </div>
        </div>
      </div>
    </>
  );
};

export default DjPerfil;
