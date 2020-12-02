import React, { useState } from "react";
import Select from "react-select";

//pasamos el objeto original completo y la funcion para devolver el item con su categoria
export const SetItem = ({ getItemWithCategory, onlyCategories }) => {
  // Item actual que esta ingresando el Usuario
  const [item, setItem] = useState("");
  // Categoria que esta eligiendo el Usuario
  const [category, onChange] = useState({});

  //almacenamos todas las categorías existentes del objecto original acá
  const options = onlyCategories;

  //atrapamos el string con el item ingresado por usuario
  function itemSetter(e) {
    setItem(e.target.value);
  }

  //clicl al boton le mandamos la información con la categoría y el item al padre (formulario)
  function infoToParent() {
    let data = { category: category.label, item: item };
    getItemWithCategory(data);
    setItem("");
  }

  return (
    <div className="form-group">
      <p className="font-weight-bold">Agregar Items</p>
      <div className="mb-3">
        <label htmlFor="seleccionar-categoria">Elegir Categoria</label>
        <Select
          options={options}
          onChange={onChange}
          name="seleccionar-categoria"
        />
      </div>
      <label htmlFor="seleccionar-item">Agregar un Item</label>
      <div>
        <input
          type="text"
          className="form-control"
          name="seleccionar-item"
          aria-describedby="helpId"
          placeholder=""
          value={item}
          onChange={(e) => itemSetter(e)}
        />
      </div>
      <span
        name="addcategory"
        className="btn btn-primary mt-1"
        role="button"
        onClick={() => infoToParent()}
      >
        Agregar Item
      </span>
    </div>
  );
};
