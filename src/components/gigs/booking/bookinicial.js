import React, { useState } from "react";
import { Form, Col } from "react-bootstrap";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import DatePicker from "react-datepicker";
import Select from "react-select";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";
import "react-datepicker/dist/react-datepicker.css";

const warning = (
  <small className="text-danger">Hay campos vacíos o invalidos</small>
);

const dayWarning = (
  <small className="text-danger">No puedes agendar el mismo día</small>
);

const todoOk = (
  <h4 className="text-success font-weight-bold">
    {`Booking ha sido enviado con éxito, espera respuesta del Dj :) ! `}
  </h4>
);
// PLACEHOLDERS

export const serviciosOptions = [
  { value: "Club", label: "Club" },
  { value: "Festival", label: "Festival" },
  { value: "Matrimonio", label: "Matrimonio" },
  { value: "Cumpleaños", label: "Cumpleaños" },
  { value: "Evento Corporativo", label: "Evento Corporativo" },
  { value: "Fiesta Privada", label: "Fiesta Privada" },
  { value: "After", label: "After" },
];

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

const Booking = ({
  clientUsername,
  djUsername,
  clientId,
  djId,
  token,
  fetchUrl,
  artistName,
}) => {
  const [dia, setDia] = useState(new Date());
  const [tipo, setTipo] = useState("");
  const [nombreEvent, setNombreEvent] = useState("");
  const [url, setUrl] = useState("");
  const [direccion, setDireccion] = useState("");
  const [llegada, setLLegada] = useState("");
  const [toca, setToca] = useState("");
  const [duracion, setDuracion] = useState("");
  const [transporte, setTransporte] = useState(2);
  const [oferta, setOferta] = useState("");
  const [telefono, setTelefono] = useState("");
  const [privado, setPrivado] = useState(2);
  const [requisitos, setRequisitos] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [invalidDay, setInvalidDay] = useState(false);

  //Envio booking exitodo
  const [ok, setOk] = useState(false);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const id_cuenta_cliente = clientId;
  const username_cliente = clientUsername;

  const id_cuenta_dj = djId;
  const username_dj = djUsername;

  const handleChange = (val) => setTransporte(val);
  const handleChange2 = (val) => setPrivado(val);

  function mandarBooking() {
    if (dia.toDateString() === new Date().toDateString()) {
      return setInvalidDay(true);
    }
    if (
      tipo === "" ||
      nombreEvent === "" ||
      direccion === "" ||
      llegada === "" ||
      toca === "" ||
      oferta === "" ||
      telefono === "" ||
      mensaje === ""
    ) {
      return setInvalid(true);
    }
    if (!requisitos) {
      return setInvalid(true);
    }
    setInvalid(false);
    setInvalidDay(false);

    let gig = {
      client_id: id_cuenta_cliente,
      dj_id: id_cuenta_dj,
      username_cliente: username_cliente,
      username_dj: username_dj,
      estado: "Pendiente",
      dia_evento: dia,
      tipo_evento: tipo.value,
      nombre_evento: nombreEvent,
      telefono: telefono,
      direccion: direccion,
      hora_llegada: llegada,
      duracion: duracion.value,
      hora_show: toca,
      transporte: transporte === 1 ? "Si" : "No",
      oferta: oferta,
      link_evento: url,
      privado: transporte === 1 ? true : false,
      artist_name: artistName,
      mensaje: [
        {
          mensaje: mensaje,
          fecha: new Date(),
          nombre: username_cliente,
          estado: "Pendiente",
        },
      ],
      leido_por_dj: false,
      leido_por_cliente: true,
    };
    registerGigFetch(gig);
    // console.log(gig);
    return null;
  }

  function registerGigFetch(obj) {
    console.log(obj);
    fetch(`${fetchUrl}gig/register`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.msg) {
          setIsLoaded(true);
          console.log(data.msg);
          setError(true);
        } else {
          setIsLoaded(true);
          setOk(true);
          console.log(data);
        }
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
        console.log(error.message);
      });
  }

  if (error) {
    return <div>Hubo un error de conexión :( !</div>;
  } else if (ok) {
    return <>{todoOk}</>;
  } else {
    return (
      <div className="container">
        <Form>
          <Form.Row>
            <Col className="col-md-12">
              <span> {` Cliente:  ${username_cliente}`}</span>
            </Col>
            <Col className="col-md-12">
              <span>{` DJ: ${username_dj}`}</span>
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12">
              <span>
                Evento es privado?
                <Tippy content="Si es publico podremos publicitar el nombre del evento con el link en nuestra página">
                  <i className="fas fa-info-circle"></i>
                </Tippy>
              </span>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={2}
                value={privado}
                onChange={handleChange2}
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
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12">
              <span>Facilitas Transporte?</span>

              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={2}
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
            </Col>
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12 mt-2">
              <span>Has leído los requisitos mínimos del DJ?</span>
              <Form.Check
                inline
                label="Si"
                type={"radio"}
                id={`1`}
                onChange={() => setRequisitos(true)}
              />
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12">
              <span>Día del Evento</span>
              <DatePicker selected={dia} onChange={(date) => setDia(date)} />
              {invalidDay ? dayWarning : null}
            </Col>
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12">
              <span>Hora llegada DJ</span>
              <DatePicker
                selected={llegada}
                onChange={(date) => setLLegada(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </Col>
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12">
              <span>Hora que toca DJ</span>
              <DatePicker
                selected={toca}
                onChange={(date) => setToca(date)}
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={15}
                timeCaption="Time"
                dateFormat="h:mm aa"
              />
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12">
              <span>Tipo de Evento</span>
              <Select
                options={serviciosOptions}
                value={tipo}
                onChange={setTipo}
              />
            </Col>
          </Form.Row>

          <Form.Row className="mt-2">
            <Col className="d-flex flex-column">
              <span>Nombre del Evento</span>
              <Form.Control
                placeholder="Nombre del evento"
                value={nombreEvent}
                onChange={(e) => setNombreEvent(e.target.value)}
              />
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12">
              <span>
                URL a evento (opcional){" "}
                <Tippy content="Comparte un flyer o link con información del evento">
                  <i className="fas fa-info-circle"></i>
                </Tippy>
              </span>
              <Form.Control
                placeholder="https://www.mievento.com/unevento"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col className="d-flex flex-column col-md-6 col-sm-12 col-xs-12">
              <span>Dirección del Evento</span>
              <Form.Control
                placeholder="Calle, Numero, Comuna"
                value={direccion}
                onChange={(e) => setDireccion(e.target.value)}
              />
            </Col>
            <Col className="d-flex flex-column col-md-6 col-sm-12 col-xs-12">
              <span>Duración Performance</span>
              <Select
                options={tiempos}
                value={duracion}
                onChange={setDuracion}
              />
            </Col>
          </Form.Row>
          <Form.Row className="mt-2">
            <Col className="d-flex flex-column">
              <span>Ingresa un teléfono de contacto</span>
              <Form.Control
                placeholder=""
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
              />
            </Col>
          </Form.Row>

          <Form.Row>
            <Col className="d-flex flex-column col-md-12 mt-3">
              <span>Tu oferta en CLP</span>
              <Form.Control
                placeholder="Ej: 150.000"
                value={oferta}
                onChange={(e) => setOferta(e.target.value)}
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col className="d-flex flex-column col-md-12 col-sm-12 col-xs-12 mt-3">
              <span>Ingresa un mensaje inicial</span>
              <textarea
                rows="3"
                value={mensaje}
                onChange={(e) => setMensaje(e.target.value)}
              ></textarea>
            </Col>
          </Form.Row>
          <Form.Row className="mt-3 mb-3">
            <span className="btn btn-primary" onClick={mandarBooking}>
              Generar Booking
            </span>
            {invalid ? warning : null}
          </Form.Row>
        </Form>
      </div>
    );
  }
};

export default Booking;
