import React, { useState } from "react";
import { ChromePicker } from "react-color";

export const Subheader = ({ updateHome }) => {
  const [color, setColor] = useState({ background: "#000000" });
  const [titulo, setTitulo] = useState("");
  const [box1title, setBox1title] = useState("");
  const [box1text, setBox1text] = useState("");
  const [box2title, setBox2title] = useState("");
  const [box2text, setBox2text] = useState("");

  // const [cita, setCita] = useState("");
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
    updateHome("subheader", "image", file.secure_url);
    setLoading(false);
  };

  function updateBox1() {
    let box = { title: box1title, text: box1text };
    updateHome("subheader", "box1", box);
    setBox1title("");
    setBox1text("");
  }

  function updateBox2() {
    let box = { title: box2title, text: box2text };
    updateHome("subheader", "box2", box);
    setBox2title("");
    setBox2text("");
  }

  return (
    <div className="col-md-12 mt-4">
      <div className="row">
        <span className="font-weight-bold mb-3">SUBHEADER</span>
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
      <div className="row d-flex flex-column align-content-center mt-5">
        <span className="font-weight-light  mb-2">
          Cambiar color de fondo cajas y footer
        </span>

        <div>
          <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        </div>
      </div>
      <div className="row d-flex justify-content-center mt-1">
        <span
          name="addcategory"
          className="btn btn-primary mt-1"
          role="button"
          onClick={() => updateHome("subheader", "color", color)}
        >
          Actualizar Color
        </span>
      </div>
      <div className="row mt-4 d-flex flex-column">
        <span className="pb-1 mb-2">Actualizar título de subheader</span>
        <div>
          <input
            type="text"
            className="form-control"
            name="subheader-title"
            aria-describedby="helpId"
            placeholder=""
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
          <span
            name="addcategory"
            className="btn btn-primary mt-2 mb-5"
            role="button"
            onClick={() => {
              updateHome("subheader", "title", titulo);
              setTitulo("");
            }}
          >
            Actualizar Título
          </span>
        </div>
      </div>
      <div className="mb-3 mt-3">
        <span className="font-weight-bold">BOXES</span>
      </div>
      <div className="row">
        <div className="col-md-6">
          <span className="font-weight-light pb-1 mb-2">Titulo Box 1</span>
          <div>
            <input
              type="text"
              className="form-control"
              name="box1-title"
              aria-describedby="helpId"
              placeholder=""
              value={box1title}
              onChange={(e) => setBox1title(e.target.value)}
            />
            <div class="form-group">
              <label htmlFor="box1-cita">
                <span className="font-weight-light mt-3">Texto Box 1</span>
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={box1text}
                onChange={(e) => setBox1text(e.target.value)}
              ></textarea>
              <span
                name="updateBox"
                className="btn btn-primary mt-2 mb-5"
                role="button"
                onClick={() => updateBox1()}
              >
                Actualizar Box
              </span>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <span className="font-weight-light pb-1 mb-2">Titulo Box 2</span>
          <div>
            <input
              type="text"
              className="form-control"
              name="box2-title"
              aria-describedby="helpId"
              placeholder=""
              value={box2title}
              onChange={(e) => setBox2title(e.target.value)}
            />
            <div class="form-group">
              <label htmlFor="box1-cita">
                <span className="font-weight-light mt-3">Texto Box 1</span>
              </label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                value={box2text}
                onChange={(e) => setBox2text(e.target.value)}
              ></textarea>
              <span
                name="updateBox"
                className="btn btn-primary mt-2 mb-5"
                role="button"
                onClick={() => updateBox2()}
              >
                Actualizar Box
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
