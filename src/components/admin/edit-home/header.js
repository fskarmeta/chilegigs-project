import React, { useState } from "react";

export const Header = ({ updateHome }) => {
  const [cita, setCita] = useState("");

  function setImg(e) {
    let img = e.target.value;
    let replaced = img.replace(/^(.*[\\\/])/, "");
    updateHome("header", "image", `./img/home/${replaced}`);
  }
  return (
    <div className="col-md-12">
      <div className="row">
        <span className="font-weight-bold mb-3">HEADER</span>
      </div>
      <div className="row d-flex flex-column">
        <span className="font-weight-light pb-1">Cambiar imagen de fondo</span>
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
      <div className="row d-flex flex-column mt-2">
        <div class="form-group">
          <label htmlFor="exampleFormControlTextarea1">
            <span className="font-weight-light mt-3">
              Modificar Texto Header
            </span>
          </label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            value={cita}
            onChange={(e) => setCita(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="row">
        <span
          name="addcategory"
          className="btn btn-primary"
          role="button"
          onClick={() => {
            updateHome("header", "cita", cita);
            setCita("");
          }}
        >
          Actualizar Cita
        </span>
      </div>
    </div>
  );
};
