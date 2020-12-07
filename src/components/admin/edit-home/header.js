import React, { useState } from "react";

export const Header = ({ updateHome }) => {
  const [cita, setCita] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "home_preset");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/chilegigs/image/upload/",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    updateHome("header", "image", file.secure_url);
    setLoading(false);
  };

  return (
    <div className="col-md-12">
      <div className="row">
        <span className="font-weight-bold mb-3">HEADER</span>
      </div>
      <div className="row d-flex flex-column">
        {loading ? null : (
          <img
            src={image}
            alt=""
            className="img-thumbnail"
            style={{ width: "300px" }}
          />
        )}
        <span className="font-weight-light pb-1">Cambiar imagen de fondo</span>
        <div class="custom-file">
          <input
            type="file"
            name="file"
            className="custom-file-input"
            id="customFile"
            onChange={uploadImage}
          />
          <label className="custom-file-label" htmlFor="customFile">
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
