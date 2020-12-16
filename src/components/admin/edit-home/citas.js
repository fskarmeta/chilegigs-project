import React, { useState } from "react";

export const Citas = ({ getCita }) => {
  const [objeto, setObjeto] = useState({ imagen: "", nombre: "", cita: "" });
  const [nombre, setNombre] = useState("");
  const [cita, setCita] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "citas_preset");
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
    let objectCopy = { ...objeto };
    setObjeto({ ...objectCopy, imagen: file.secure_url });
    setLoading(false);
  };

  return (
    <div className="col-md-12 mt-4">
      <span className="font-weight-bold mb-3">CITAS</span>
      <div className="row">
        <div className="col-md-6">
          <div>
            {loading ? null : (
              <img
                src={image}
                alt=""
                className="img-thumbnail"
                style={{ width: "300px" }}
              />
            )}
            <span className="font-weight-light pb-1">
              Cambiar imagen de fondo
            </span>
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
            setImage("");
            setLoading(true);
          }}
        >
          Agregar Cita
        </span>
      </div>
    </div>
  );
};
