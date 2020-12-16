import React, { useState } from "react";

import Select from "react-select";

const warning = (
  <small className="text-danger pl-1">Campo demasiado largo</small>
);

const Generador = ({
  equipos,
  array,
  atributo,
  updateRequisitosProfile,
  titulo,
}) => {
  const [value, setValue] = useState("");
  const [item, setItem] = useState({});
  //pasar array de Usuario
  const [arr, setArr] = useState(array);
  const [custom, setCustom] = useState("");
  const [customval, setCustomval] = useState(false);

  function agregarItem() {
    if (typeof arr === "object") {
      let arrCopy = [...arr];
      if (arrCopy.length > 25) {
        return;
      }
      arrCopy.push(`${value} ${item.value}`);
      updateRequisitosProfile(atributo, arrCopy);
      setArr(arrCopy);
      setValue("");
      setItem({});
    }
  }

  function agregarCustomItem() {
    if (typeof arr === "object") {
      if (custom.length > 40) {
        return setCustomval(true);
      }
      setCustomval(false);
      let arrCopy = [...arr];
      if (arrCopy.length > 25) {
        return;
      }
      arrCopy.push(custom);
      updateRequisitosProfile(atributo, arrCopy);
      setArr(arrCopy);
      setCustom("");
    }
  }

  function borrarItem(i) {
    if (typeof arr === "object") {
      let arrCopy = [...arr];
      arrCopy.splice(i, 1);
      updateRequisitosProfile(atributo, arrCopy);
      setArr(arrCopy);
    }
  }
  return (
    <div className="row">
      <h4 className="ml-3">{`${titulo}`}</h4>
      <div className="col-md-12 d-flex bg success">
        <div className="d-flex flex-column">
          <div className="d-flex flex-column">
            <label htmlFor="quantity">N°</label>
            <div>
              <input
                type="number"
                id="cantidad"
                name="cantidad"
                min="1"
                max="500"
                className="pt-2"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                style={{ width: "3rem" }}
              />
            </div>
          </div>
        </div>
        <div className="d-flex flex-column ml-1">
          <label htmlFor="quantity">Item</label>
          <div style={{ width: "13rem" }}>
            <Select
              name="servicios"
              options={equipos}
              className="selector-items"
              placeholder="Item"
              value={item}
              onChange={setItem}
            />
          </div>
        </div>
        <div className="d-flex flex-column ml-1">
          <label htmlFor="agregar-item">Agregar</label>
          <span
            name="mandar-item"
            className="btn btn-primary"
            role="button"
            style={{ height: "2.4rem" }}
            onClick={agregarItem}
          >
            Add
          </span>
        </div>
      </div>
      <div className="col-md-12 d-flex">
        <div className="d-flex flex-column mt-1">
          <label htmlFor="agregar-custom-item">Custom item</label>
          <input
            type="text"
            className="form-control"
            placeholder="Custom item"
            style={{ width: "16.3rem" }}
            value={custom}
            onChange={(e) => setCustom(e.target.value)}
          />
          {customval ? warning : null}
        </div>
        <div className="d-flex flex-column mt-1">
          <label htmlFor="agregar-custom-item">Agregar</label>
          <span
            name="mandar-custom-item"
            className="btn btn-primary ml-1"
            role="button"
            style={{ height: "2.4rem" }}
            onClick={agregarCustomItem}
          >
            Add
          </span>
        </div>
      </div>
      <div className="col-md-12 mt-2">
        <h5 className="ml-3">Borrar items</h5>
        <div className="row d-flex flex-column">
          {arr &&
            arr.map((item, index) => (
              <div
                className="d-flex justify-content-between m-1"
                key={index}
                style={{ width: "20rem" }}
              >
                <li className="ml-3">{item}</li>
                <span
                  name="mandar-custom-item"
                  className="btn btn-danger ml-1"
                  role="button"
                  onClick={() => borrarItem(index)}
                >
                  Borrar
                </span>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Generador;
