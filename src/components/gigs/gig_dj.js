import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../store/appContext";
import { Badge } from "react-bootstrap";
import { colorState } from "../general/helper";

const mensajeEnviado = (
  <small className="text-success">Mensaje ha sido enviado !</small>
);

const DjGig = ({
  options,
  warning,
  optionsHoras,
  cambios,
  gig,
  updateGig,
  id,
  previousPage,
}) => {
  const { store, actions } = useContext(Context);
  const [msg, setMsg] = useState("");
  const [msgWarning, setMsgWarning] = useState(false);
  const [
    aceptadoODeclinadoOConfirmado,
    setAceptadoODeclinadoOConfirmado,
  ] = useState(false);
  const [pideCambios, setPideCambios] = useState(false);

  const [msgSended, setMsgSended] = useState(false);

  useEffect(() => {
    if (
      gig.estado === "Aceptado" ||
      gig.estado === "Declinado" ||
      gig.estado === "Confirmado" ||
      gig.estado === "Cancelado" ||
      gig.estado === "Terminado" ||
      gig.estado === "Dj pide cambios"
    ) {
      setAceptadoODeclinadoOConfirmado(true);
    }
    if (gig.estado === "Dj pide cambios") {
      setPideCambios(true);
    }
    return () => {
      actions.fetchAllUserGigs(store.token);
    };
  }, [actions, gig.estado, store.token]);

  function soloMensaje() {
    if (msg === "") {
      return setMsgWarning(true);
    } else {
      let gigCopy = { ...gig };
      let mensajesArray = gigCopy.mensaje;
      mensajesArray.unshift({
        nombre: gig.username_dj,
        fecha: new Date(),
        estado: "Sin cambios",
        mensaje: msg,
      });
      let data = {
        ...gig,
        mensaje: mensajesArray,
        leido_por_dj: true,
        leido_por_cliente: false,
      };
      updateGig(data, id);
      setMsgSended(true);
      setMsg("");
      setMsgWarning(false);
      previousPage();
    }
  }

  function gigAceptado() {
    if (msg === "") {
      return setMsgWarning(true);
    } else {
      let gigCopy = { ...gig };
      let mensajesArray = gigCopy.mensaje;
      mensajesArray.unshift({
        nombre: gig.username_dj,
        fecha: new Date(),
        estado: "Aceptado",
        mensaje: msg,
      });

      //fetch
      let data = {
        ...gig,
        mensaje: mensajesArray,
        estado: "Aceptado",
        leido_por_dj: true,
        leido_por_cliente: false,
      };
      updateGig(data, id);
      setAceptadoODeclinadoOConfirmado(true);
      setMsgSended(true);
      setMsg("");
      setMsgWarning(false);
      previousPage();
    }
  }

  function gigDeclinado() {
    if (msg === "") {
      return setMsgWarning(true);
    } else {
      let gigCopy = { ...gig };
      let mensajesArray = gigCopy.mensaje;
      mensajesArray.unshift({
        nombre: gig.username_dj,
        fecha: new Date(),
        estado: "Declinado",
        mensaje: msg,
      });

      //fetch
      let data = {
        ...gig,
        mensaje: mensajesArray,
        estado: "Declinado",
        leido_por_dj: true,
        leido_por_cliente: false,
      };

      updateGig(data, id);
      setAceptadoODeclinadoOConfirmado(true);
      setMsgSended(true);
      setMsg("");
      setMsgWarning(false);
      previousPage();
    }
  }

  function gigModificado() {
    if (msg === "") {
      return setMsgWarning(true);
    } else {
      let gigCopy = { ...gig };
      let mensajesArray = gigCopy.mensaje;
      mensajesArray.unshift({
        nombre: gig.username_dj,
        fecha: new Date(),
        estado: "Dj pide cambios",
        mensaje: msg,
      });
      //fetch
      let data = {
        ...gig,
        mensaje: mensajesArray,
        estado: "Dj pide cambios",
        leido_por_dj: true,
        leido_por_cliente: false,
      };

      updateGig(data, id);
      setMsg("");
      setPideCambios(true);
      setMsgSended(true);
      setMsgWarning(false);
      previousPage();
    }
  }

  return (
    <div class="card">
      <div class="card-body">
        <div className="row">
          <div className="col-md-4">
            <span className="font-weight-bold">Estado: </span>
            <span className="font-weight-light gig-text">
              <Badge variant={`${colorState(gig.estado)}`}>{gig.estado}</Badge>
            </span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-2 d-flex flex-column">
            <span className="font-weight-bold">Cliente:</span>

            <span className="font-weight-light gig-text">
              {gig.username_cliente}
            </span>
          </div>
          <div className="col-md-2 d-flex flex-column">
            <span className="font-weight-bold">Dj:</span>

            <span className="font-weight-light gig-text">
              {gig.username_dj}
            </span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Día del evento: </span>
            <span className="font-weight-light gig-text">
              {new Date(gig.dia_evento).toLocaleDateString("es-CL", options)}
            </span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Tipo de evento: </span>
            <span className="font-weight-light gig-text">
              {gig.tipo_evento}
            </span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Nombre de evento: </span>
            <span className="font-weight-light gig-text">
              {gig.nombre_evento}
            </span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Link a evento: </span>
            <span className="font-weight-light gig-text">
              {gig.link_evento}
            </span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Teléfono de contacto: </span>
            <span className="font-weight-light gig-text">{gig.telefono}</span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Hora que debes llegar: </span>
            <span className="font-weight-light gig-text">
              {new Date(gig.hora_llegada).toLocaleString("es-CL", optionsHoras)}
            </span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Hora que tocas: </span>
            <span className="font-weight-light gig-text">
              {new Date(gig.hora_show).toLocaleString("es-CL", optionsHoras)}
            </span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Duración: </span>
            <span className="font-weight-light gig-text">{gig.duracion}</span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Se facilita transporte: </span>
            <span className="font-weight-light gig-text">{gig.transporte}</span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Oferta en CLP: </span>
            <span className="font-weight-light gig-text">{gig.oferta}</span>
          </div>
        </div>
      </div>
      {aceptadoODeclinadoOConfirmado ? (
        <div className="col-md-12 d-flex flex-column">
          <span className="font-weight-bold">
            Por el momento solo puedes enviar un mensaje.
          </span>
          <span className="font-weight-light gig-text">
            <textarea
              id="emensaje"
              rows="3"
              className="col-md-10 mt-2"
              value={msg}
              onChange={(e) => setMsg(e.target.value)}
            ></textarea>
            {msgWarning ? warning : null}
          </span>
          <div>
            <span className="btn btn-success m-1" onClick={soloMensaje}>
              Enviar Mensaje
            </span>
            {msgSended ? mensajeEnviado : null}
            {gig.estado === "Pendiente" ||
            gig.estado === "Modificado por Cliente" ||
            gig.estado === "Dj pide cambios" ? (
              <span className="btn btn-danger m-1" onClick={gigDeclinado}>
                Declinar Booking
              </span>
            ) : null}
          </div>
        </div>
      ) : (
        <div class="card">
          <div class="card-body">
            <div className="row mt-2">
              <div className="col-md-12 d-flex flex-column">
                <span className="font-weight-bold">
                  Deja un mensaje relacionado con tu siguiente acción:{" "}
                </span>
                <span className="font-weight-light gig-text">
                  <textarea
                    id="emensaje"
                    rows="3"
                    className="col-md-10 mt-2"
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                  ></textarea>
                  {msgWarning ? warning : null}
                </span>
              </div>
              <div className="col-md-12">
                {pideCambios ? (
                  <div>
                    <span className="btn btn-success m-1" onClick={soloMensaje}>
                      Enviar Mensaje
                    </span>

                    {gig.estado === "Pendiente" ||
                    gig.estado === "Modificado por Cliente" ||
                    gig.estado === "Dj pide cambios" ? (
                      <span
                        className="btn btn-danger m-1"
                        onClick={gigDeclinado}
                      >
                        Declinar Booking
                      </span>
                    ) : null}
                    {msgSended ? mensajeEnviado : null}
                    {msgWarning ? warning : null}
                  </div>
                ) : (
                  <>
                    <span className="btn btn-success m-1" onClick={gigAceptado}>
                      Aceptar Gig
                    </span>
                    <span
                      className="btn btn-primary m-1"
                      onClick={gigModificado}
                    >
                      Pedir Modificaciones
                    </span>
                    <span className="btn btn-danger m-1" onClick={gigDeclinado}>
                      Declinar
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
      <div classname="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-12 mb-2">
              <span className="font-weight-bold ml-2">Log de mensajes:</span>
            </div>
          </div>
          <div className="row">
            <div className="col-md-11">
              {!!gig.mensaje &&
                gig.mensaje.map((msg, i) => (
                  <div className="card" key={i}>
                    <div className="card-body">
                      <div className="d-flex flex-column">
                        <span>
                          {`${new Date(msg.fecha).toLocaleDateString(
                            "es-CL",
                            options
                          )} por `}
                          <span className="font-weight-bold">{msg.nombre}</span>
                        </span>
                        <span>
                          Estado:
                          <span>
                            {" "}
                            <Badge variant={`${colorState(msg.estado)}`}>
                              {msg.estado}
                            </Badge>
                          </span>
                        </span>
                        <span className="font-weight-bol">Mensaje:</span>
                        <span className="gig-texto-mensaje ml-3">
                          {msg.mensaje}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DjGig;
