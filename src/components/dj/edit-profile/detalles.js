import React, { useState } from "react";
import Select from "react-select";

// const warning = <small className="text-danger">Texto demasiado largo</small>;

const tiempos = [
  { label: "30 min", value: "30 min" },
  { label: "1 hr", value: "1hr" },
  { label: "1 hr 30 min", value: "1 hr 30 min" },
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

const staffArr = [
  { label: "0", value: "0" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
  { label: "7", value: "7" },
  { label: "8", value: "8" },
  { label: "9", value: "9" },
  { label: "10", value: "10" },
];

const sino = [
  { label: "Si", value: "Si" },
  { label: "No", value: "No" },
];

const validacionDetalles = (
  <small className="text-success mt-1 pl-3">Detalles actualizados!</small>
);
const Detalles = ({ updateProfile }) => {
  const [durMin, setDurmin] = useState({ label: "", value: "" });
  const [durMax, setDurmax] = useState({ label: "", value: "" });
  const [staff, setStaff] = useState({ label: "", value: "" });
  const [viajes, setViajes] = useState({ label: "", value: "" });
  const [arriendo, setArriendo] = useState({});
  const [ok, setOk] = useState(false);

  function mandarDetalles() {
    updateProfile({
      dur_min: durMin.value,
      dur_max: durMax.value,
      staff: parseInt(staff.value),
      viajes: viajes.value,
      arrienda_equipos: arriendo.value,
    });
    setOk(true);
  }
  return (
    <div className="border border-dark p-3 mt-2 rounded">
      <div className="d-flex justify-content-start mb-1 ml-1">
        <h3>Detalles Generales del Espectáculo</h3>
      </div>

      <div className="col-md-12">
        <div className="row d-flex justify-content-center">
          <div className="col-md-4 mt-2">
            <div className="d-flex flex-column">
              <span className="font-weight-light align-self-center">
                Duración Mínima
              </span>
              <Select options={tiempos} onChange={setDurmin} />
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="d-flex flex-column">
              <span className="font-weight-light align-self-center">
                Duración Máxima
              </span>
              <Select options={tiempos} onChange={setDurmax} />
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="d-flex flex-column">
              <span className="font-weight-light align-self-center">
                Acompañantes/Staff
              </span>
              <Select options={staffArr} onChange={setStaff} />
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="d-flex flex-column">
              <span className="font-weight-light align-self-center">
                Viajes
              </span>
              <Select options={sino} onChange={setViajes} />
            </div>
          </div>
          <div className="col-md-4 mt-2">
            <div className="d-flex flex-column">
              <span className="font-weight-light align-self-center">
                Arriendo Equipos
              </span>
              <Select options={sino} onChange={setArriendo} />
            </div>
          </div>
        </div>
        <span
          name="mandar-detalles"
          className="btn btn-primary mt-4"
          role="button"
          onClick={mandarDetalles}
        >
          Actualizar Detalles
        </span>
      </div>
      {ok ? validacionDetalles : null}
    </div>
  );
};

export default Detalles;
