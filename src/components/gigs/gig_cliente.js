import React, { useState, useEffect, useContext } from "react";
// import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import DatePicker from "react-datepicker";
import Select from "react-select";
import { Badge } from "react-bootstrap";
import { colorState } from "../general/helper";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";

const tiempos = [
  { label: "30 min", value: "30 min" },
  { label: "45 min", value: "45 min" },
  { label: "1 hr", value: "1hr" },
  { label: "1 hr 30 min", value: "1 hr 30 min" },
  { label: "1 hr 45 min", value: "1 hr 45 min" },
  { label: "2 hrs", value: "2 hrs" },
  { label: "2 hrs 30 min", value: "2 hrs 30 min" },
  { label: "3 hrs", value: "3 hrs" },
  { label: "3 hrs 30 min", value: "3 hrs 30 min" },
  { label: "4 hrs", value: "4 hrs" },
  { label: "5 hrs 30 min", value: "5 hrs 30 min" },
  { label: "6 hrs", value: "6 hrs" },
  { label: "6 hrs 30 min", value: "6 hrs 30 min" },
  { label: "7 hrs", value: "7 hrs" },
];

const confirmarMsg = (
  <small className="text-danger">
    Solo podrás confirmar una vez que el DJ haya aceptado
  </small>
);

const mensajeEnviado = (
  <small className="text-success">Mensaje ha sido enviado !</small>
);

const ClientGig = ({
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
  const [confirmar, setConfirmar] = useState(false);
  const [
    confirmadoODeclinadoOCanceladoOPendiente,
    setconfirmadoODeclinadoOCanceladoOPendiente,
  ] = useState(false);
  const [pideCambios, setPideCambios] = useState(false);
  // const [ejemploGig, setEjemploGig] = useState({});

  // cambios
  const [llegada, setLLegada] = useState(new Date(gig.hora_llegada));
  const [toca, setToca] = useState(new Date(gig.hora_show));
  const [duracion, setDuracion] = useState({
    label: gig.duracion,
    value: gig.duracion,
  });
  const [transporte, setTransporte] = useState(gig.transporte === "Si" ? 1 : 2);
  const [oferta, setOferta] = useState(gig.oferta);

  //

  const [msgSended, setMsgSended] = useState(false);

  useEffect(() => {
    if (
      gig.estado === "Cancelado" ||
      gig.estado === "Declinado" ||
      gig.estado === "Pendiente" ||
      gig.estado === "Confirmado" ||
      gig.estado === "Terminado" ||
      gig.estado === "Modificado por Cliente"
    ) {
      setconfirmadoODeclinadoOCanceladoOPendiente(true);
    }
    if (gig.estado === "Modificado por Cliente") {
      setPideCambios(true);
    }
    return () => {
      actions.fetchAllUserGigs(store.token);
    };
  }, [actions, gig.estado, store.token]);

  //Para el transporte si /no
  const handleChange = (val) => setTransporte(val);
  //

  function soloMensaje() {
    if (msg === "") {
      return setMsgWarning(true);
    } else {
      let gigCopy = { ...gig };
      let mensajesArray = gigCopy.mensaje;
      mensajesArray.unshift({
        nombre: gig.username_cliente,
        fecha: new Date(),
        estado: "Sin cambios",
        mensaje: msg,
      });
      let data = {
        ...gig,
        mensaje: mensajesArray,
        leido_por_dj: false,
        leido_por_cliente: true,
      };
      updateGig(data, id);
      setMsgSended(true);
      setMsg("");
      setMsgWarning(false);
      previousPage();
    }
  }

  function clienteConfirmo() {
    if (gig.estado !== "Aceptado") {
      return setConfirmar(true);
    }
    if (msg === "") {
      return setMsgWarning(true);
    } else {
      let gigCopy = { ...gig };
      let mensajesArray = gigCopy.mensaje;
      mensajesArray.unshift({
        nombre: gig.username_cliente,
        fecha: new Date(),
        estado: "Confirmado",
        mensaje: msg,
      });
      //fetch

      let data = {
        ...gig,
        mensaje: mensajesArray,
        estado: "Confirmado",
        leido_por_dj: false,
        leido_por_cliente: true,
      };
      updateGig(data, id);
      setconfirmadoODeclinadoOCanceladoOPendiente(true);
      setMsgSended(true);
      setMsg("");
      setMsgWarning(false);
      previousPage();
    }
  }

  function clienteCancelo() {
    if (msg === "") {
      return setMsgWarning(true);
    } else {
      let gigCopy = { ...gig };
      let mensajesArray = gigCopy.mensaje;
      mensajesArray.unshift({
        nombre: gig.username_cliente,
        fecha: new Date(),
        estado: "Cancelado",
        mensaje: msg,
      });

      //fetch
      let data = {
        ...gig,
        mensaje: mensajesArray,
        estado: "Cancelado",
        leido_por_dj: false,
        leido_por_cliente: true,
      };
      updateGig(data, id);
      setconfirmadoODeclinadoOCanceladoOPendiente(true);
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
        nombre: gig.username_cliente,
        fecha: new Date(),
        estado: "Modificado por Cliente",
        mensaje: msg,
      });
      //fetch
      let data = {
        ...gig,
        mensaje: mensajesArray,
        estado: "Modificado por Cliente",
        leido_por_dj: false,
        leido_por_cliente: true,
        duracion: duracion.label,
        hora_llegada: llegada,
        hora_show: toca,
        transporte: transporte === 1 ? "Si" : "No",
        oferta: oferta,
      };

      updateGig(data, id);
      setPideCambios(true);
      setMsgSended(true);
      setMsg("");
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
            <span className="font-weight-bold">Hora que debe llegar DJ: </span>
            <span className="font-weight-light gig-text">
              {confirmadoODeclinadoOCanceladoOPendiente ||
              gig.estado === "Aceptado" ? (
                new Date(gig.hora_llegada).toLocaleString("es-CL", optionsHoras)
              ) : (
                <DatePicker
                  selected={llegada}
                  onChange={(date) => setLLegada(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              )}
            </span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Hora que toca DJ: </span>
            <span className="font-weight-light gig-text">
              {confirmadoODeclinadoOCanceladoOPendiente ||
              gig.estado === "Aceptado" ? (
                new Date(gig.hora_show).toLocaleString("es-CL", optionsHoras)
              ) : (
                <DatePicker
                  selected={toca}
                  onChange={(date) => setToca(date)}
                  showTimeSelect
                  showTimeSelectOnly
                  timeIntervals={15}
                  timeCaption="Time"
                  dateFormat="h:mm aa"
                />
              )}
            </span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Duración: </span>
            <span className="font-weight-light gig-text">
              {confirmadoODeclinadoOCanceladoOPendiente ||
              gig.estado === "Aceptado" ? (
                gig.duracion
              ) : (
                <Select
                  options={tiempos}
                  value={duracion}
                  onChange={setDuracion}
                />
              )}
            </span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Se facilita transporte: </span>
            <span className="font-weight-light gig-text">
              {confirmadoODeclinadoOCanceladoOPendiente ||
              gig.estado === "Aceptado" ? (
                gig.transporte
              ) : (
                <ToggleButtonGroup
                  type="radio"
                  name="options"
                  value={transporte}
                  onChange={handleChange}
                  color="black"
                  className="mt-2"
                >
                  <ToggleButton value={1} variant="secondary">
                    Si
                  </ToggleButton>
                  <ToggleButton value={2} variant="secondary">
                    No
                  </ToggleButton>
                </ToggleButtonGroup>
              )}
            </span>
          </div>
        </div>
        <div className="row mt-2">
          <div className="col-md-4 d-flex flex-column">
            <span className="font-weight-bold">Oferta en CLP: </span>
            <span className="font-weight-light gig-text">
              {confirmadoODeclinadoOCanceladoOPendiente ||
              gig.estado === "Aceptado" ? (
                gig.oferta
              ) : (
                <input
                  placeholder="Ej: 150.000"
                  value={oferta}
                  onChange={(e) => setOferta(e.target.value)}
                />
              )}
            </span>
          </div>
        </div>
      </div>
      {confirmadoODeclinadoOCanceladoOPendiente ? (
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
              <span className="btn btn-danger m-1" onClick={clienteCancelo}>
                Cancelar Booking
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
                    {msgSended ? mensajeEnviado : null}
                    {gig.estado === "Pendiente" ||
                    gig.estado === "Modificado por Cliente" ||
                    gig.estado === "Dj pide cambios" ? (
                      <span
                        className="btn btn-danger m-1"
                        onClick={clienteCancelo}
                      >
                        Cancelar Booking
                      </span>
                    ) : null}
                    {msgWarning ? warning : null}
                  </div>
                ) : (
                  <>
                    <span
                      className="btn btn-primary m-1"
                      onClick={gigModificado}
                    >
                      Enviar Modificaciones
                    </span>
                    <span
                      className="btn btn-danger m-1"
                      onClick={clienteCancelo}
                    >
                      Cancelar Booking
                    </span>
                    <span
                      className="btn btn-success m-1"
                      onClick={clienteConfirmo}
                    >
                      Confirmar Booking
                    </span>
                    {confirmar ? confirmarMsg : null}
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

export default ClientGig;
