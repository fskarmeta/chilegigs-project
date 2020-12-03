import React, { useState } from "react";
import { ChromePicker } from "react-color";

export const Subheader = ({ updateHome }) => {
  const [color, setColor] = useState({ background: "#000000" });
  const [titulo, setTitulo] = useState("");
  const [box1title, setBox1title] = useState("");
  const [box1text, setBox1text] = useState("");
  const [box2title, setBox2title] = useState("");
  const [box2text, setBox2text] = useState("");

  function captureImage(e) {
    let img = e.target.value;
    let replaced = img.replace(/^(.*[\\\/])/, "");
    updateHome("subheader", "image", `./img/home/${replaced}`);
  }

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
      <div className="row">
        <span className="font-weight-light pb-1">Cambiar imagen de fondo</span>
        <div class="custom-file mb-3">
          <input
            type="file"
            class="custom-file-input"
            id="customFile"
            onChange={(e) => captureImage(e)}
          />
          <label class="custom-file-label" for="customFile">
            Selecciona archivo
          </label>
        </div>
      </div>
      <div className="row d-flex flex-column align-content-center">
        <span className="font-weight-light pb-1 mb-2">
          Cambiar color de fondo
        </span>

        <div>
          <ChromePicker color={color} onChange={(e) => setColor(e.hex)} />
        </div>
      </div>
      <div className="row d-flex justify-content-center">
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
