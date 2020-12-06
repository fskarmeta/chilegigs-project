import React, { useState } from "react";

const warning = <small className="text-danger">Texto demasiado largo</small>;

const Biografia = ({ updateProfile }) => {
  const [biografia, setBiografia] = useState("");
  const [biografiaval, setBiografiaval] = useState(false);

  function mandarBiografia() {
    if (biografia.length > 500) {
      return setBiografiaval(true);
    }
    setBiografiaval(false);
    updateProfile({ biografia: biografia });
    setBiografiaval("");
  }
  return (
    <div className="border border-dark p-3 mt-2 rounded">
      <div className="d-flex justify-content-start mb-1 ml-1">
        <h3>Reseña</h3>
      </div>

      <div className="col-md-12">
        <div className="row">
          <label htmlFor="biografia">Agrega una descripción</label>
          <textarea
            className="form-control"
            id="biografia-perfil"
            rows="3"
            value={biografia}
            onChange={(e) => setBiografia(e.target.value)}
          ></textarea>
          {biografiaval ? warning : null}
        </div>
        <span
          name="mandar-biografia"
          className="btn btn-primary mt-4"
          role="button"
          onClick={mandarBiografia}
        >
          Actualizar Biografia
        </span>
      </div>
    </div>
  );
};

export default Biografia;
