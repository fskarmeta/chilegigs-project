import React, { useState } from "react";

export const Citas = ({ getCita }) => {
  const [objeto, setObjeto] = useState({ imagen: "", nombre: "", cita: "" });
  const [nombre, setNombre] = useState("");
  const [cita, setCita] = useState("");

  function setImg(e) {
    let objectCopy = { ...objeto };
    let img = e.target.value;
    let replaced = img.replace(/^(.*[\\\/])/, "");
    setObjeto({ ...objectCopy, imagen: `./img/home/${replaced}` });
  }

  return (
    <div className="col-md-12 mt-4">
      <span className="font-weight-bold mb-3">CITAS</span>
      <div className="row">
        <div className="col-md-6">
          <div>
            <label className="font-weight-light mt-1 mb-1">
              Imagen del Perfil
            </label>
            <div class="custom-file">
              <input
                type="file"
                class="custom-file-input"
                id="customFile"
                onChange={(e) => setImg(e)}
              />
              <label class="custom-file-label" for="customFile">
                Selecciona archivo
              </label>
            </div>
          </div>
          <div>
            <label className="font-weight-light mt-1 mb-1">
              Nombre Persona
            </label>
            <input
              type="text"
              className="form-control"
              name="persona-cita"
              aria-describedby="helpId"
              placeholder=""
              value={nombre}
              onChange={(e) => {
                let objectCopy = { ...objeto };
                setObjeto({ ...objectCopy, nombre: e.target.value });
                setNombre(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="col-md-6">
          <div class="form-group">
            <label htmlFor="agregar-cita">
              <span className="font-weight-light mt-3">Cita</span>
            </label>
            <textarea
              class="form-control"
              id="exampleFormControlTextarea1"
              rows="3"
              value={cita}
              onChange={(e) => {
                let objectCopy = { ...objeto };
                setObjeto({ ...objectCopy, cita: e.target.value });
                setCita(e.target.value);
              }}
            ></textarea>
          </div>
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-2">
        <span
          name="updateBox"
          className="btn btn-primary mt-2 mb-5"
          role="button"
          onClick={() => {
            getCita(objeto);
            setNombre("");
            setCita("");
          }}
        >
          Agregar Cita
        </span>
      </div>
    </div>
  );
};
