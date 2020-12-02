import React, { useState } from "react";
import Select from "react-select";

export const DeleteItem = ({ object, getAndDeleteItem }) => {
  const [item, onChange] = useState({});

  const options = object;
  //   click al boton le mandamos la información con la categoría como string al padre
  // group = cateogría
  // value = item
  function infoToParent() {
    getAndDeleteItem(item.group, item.value);
  }

  return (
    <div className="form-group">
      <label htmlFor="categorias">Borrar Item</label>
      <div>
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
          Borrar Item
        </span>
      </div>
    </div>
  );
};
