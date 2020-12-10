import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const validacionDatos = (
  <small className="text-success mt-1">Datos actualizados!</small>
);

const warning = <small className="text-danger">Campo demasiado largos</small>;
const DatosPersonales = ({ updateProfile }) => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [celular, setCelular] = useState("");
  const [rut, setRut] = useState("");
  const [calle, setCalle] = useState("");
  const [numero, setNumero] = useState("");
  const [ciudad, setCiudad] = useState("");
  const [region, setRegion] = useState("");
  const [pais, setPais] = useState("");
  const [error, setError] = useState(false);
  const [ok, setOk] = useState(false);
  function mandarDatos() {
    if (
      nombre.length > 25 ||
      apellido.length > 25 ||
      nacionalidad.length > 25 ||
      celular.length > 25 ||
      rut.length > 25 ||
      calle.length > 25 ||
      numero.length > 25 ||
      ciudad.length > 25 ||
      region.length > 25 ||
      pais.length > 25
    ) {
      return setError(true);
    }
    setError(false);
    setOk(true);
    updateProfile({
      datos: {
        nombre: nombre,
        apellido: apellido,
        nacionalidad: nacionalidad,
        celular: celular,
        rut: rut,
        calle: calle,
        numero: numero,
        ciudad: ciudad,
        region: region,
        pais: pais,
      },
    });

    setNombre("");
    setApellido("");
    setNacionalidad("");
    setCelular("");
    setRut("");
    setCalle("");
    setNumero("");
    setCiudad("");
    setRegion("");
    setPais("");
  }
  return (
    <div className="border border-dark p-3 mt-2 rounded mb-5">
      <div className="d-flex justify-content-start mb-1 ml-1">
        <h3>Datos Personales</h3>
        <div className="mt-1 ml-2">
          <Tippy content="Esta información solo podrá ser vista por personas que te contraten">
            <i className="fas fa-info-circle"></i>
          </Tippy>
        </div>
      </div>

      <div className="col-md-12">
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              className="form-control"
              id="nombre"
              placeholder="Nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="apellido">Apellido</label>
            <input
              type="text"
              className="form-control"
              id="apellido"
              placeholder="Apellido"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="nacionalidad">Nacionalidad</label>
            <input
              type="text"
              className="form-control"
              id="Nacionalidad"
              placeholder="Nacionalidad"
              value={nacionalidad}
              onChange={(e) => setNacionalidad(e.target.value)}
            />
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="celular">Celular</label>
            <input
              type="text"
              className="form-control"
              id="celular"
              placeholder="Celular"
              value={celular}
              onChange={(e) => setCelular(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="rut">Rut</label>
            <input
              type="text"
              className="form-control"
              id="rut"
              placeholder="Rut"
              value={rut}
              onChange={(e) => setRut(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="pais">País</label>
            <input
              type="text"
              className="form-control"
              id="pais"
              placeholder="País"
              value={pais}
              onChange={(e) => setPais(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
        </div>
        <div className="form-row">
          <div className="col-md-4 mb-3">
            <label htmlFor="calle">Calle</label>
            <input
              type="text"
              className="form-control"
              id="calle"
              placeholder="Calle"
              value={calle}
              onChange={(e) => setCalle(e.target.value)}
            />
          </div>
          <div className="col-md-1 mb-3">
            <label htmlFor="numero">N°</label>
            <input
              type="text"
              className="form-control"
              id="numero"
              placeholder="N°"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <div className="col-md-4 mb-3">
            <label htmlFor="ciudad">Ciudad</label>
            <input
              type="text"
              className="form-control"
              id="ciudad"
              placeholder="Ciudad"
              value={ciudad}
              onChange={(e) => setCiudad(e.target.value)}
            />
          </div>
          <div className="col-md-3 mb-3">
            <label htmlFor="region">Region</label>
            <input
              type="text"
              className="form-control"
              id="region"
              placeholder="Region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            />
          </div>
        </div>

        <button className="btn btn-primary mr-2" onClick={mandarDatos}>
          Actualizar Datos
        </button>
        {error ? warning : null}
        {ok ? validacionDatos : null}
      </div>
    </div>
  );
};

export default DatosPersonales;
