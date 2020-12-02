import React, { useState } from "react";
import Select from "react-select";

export const DeleteCategory = ({ onlyCategories, getCategory }) => {
  const [category, onChange] = useState({});

  //almacenamos todas las categorías existentes del objecto original acá
  const options = onlyCategories;

  //click al boton le mandamos la información con la categoría como string al padre
  function infoToParent() {
    getCategory(category.label);
  }

  return (
    <div className="form-group">
      <p className="font-weight-bold">Borrar Elementos</p>
      <label htmlFor="categorias">Borrar Categoria Completa</label>
      <div>
        <div>
          <Select options={options} onChange={onChange} />
        </div>
      </div>
      <span
        name="addcategory"
        className="btn btn-primary mt-1"
        role="button"
        onClick={() => infoToParent()}
      >
        Borrar Categoria
      </span>
    </div>
  );
};
