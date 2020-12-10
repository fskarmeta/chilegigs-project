import React, { useState } from "react";

export const SetCategory = ({ addCategory, onlyCategories }) => {
  const [category, setCategory] = useState({});
  const [value, setValue] = useState("");
  const [ok, setOk] = useState(true);
  //atrapamos la cateogría que inserto el usuario y le iniciamos un array vació con el key "options"
  function categorySetter(e) {
    setCategory({
      label: e.target.value,
      options: [],
    });
    setValue(e.target.value);
  }

  function sendtoParent() {
    if (onlyCategories.some((e) => e.label === category.label)) {
      setOk(false);
      return null;
    } else {
      addCategory(category);
      setOk(true);
      setValue("");
    }
  }

  //pasamos la funcion categorySetter al onChange para atrapar el texto
  //llamamos la funcion addCategory del padre (formulario) al hacer click
  return (
    <div className="form-group">
      <p className="font-weight-bold">Agregar Categorias</p>
      <label htmlFor="categoria">Crear Categoria</label>
      <div>
        <input
          type="text"
          className="form-control"
          name="categoria"
          aria-describedby="helpId"
          placeholder=""
          value={value}
          onChange={(e) => categorySetter(e)}
        />
      </div>
      <span
        name="addcategory"
        className="btn btn-primary mt-1"
        role="button"
        onClick={() => sendtoParent()}
      >
        Agregar Categoria
      </span>
      {!ok ? (
        <small className="ml-2 text-danger">Categoría ya existe</small>
      ) : null}
    </div>
  );
};
