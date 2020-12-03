import React, { useState } from "react";
import { Header } from "./edit-home/header";
import { Subheader } from "./edit-home/subheader";
import { Citas } from "./edit-home/citas";
import { BorrarCitas } from "./edit-home/borrar-citas";
// importacion de objeto de ejemplo
// import Home from "../../placeholder/objetoglobal";

// falta agregar los fetch , token y path's
const HomeEditForm = () => {
  const [home, setHome] = useState({});

  // Ejemplo: key1 = "header", key2 = "cita", item = "La mejor página" | Actualiza propiedad del objeto
  function updateHome(key1, key2, item) {
    let objectCopy = { ...home };
    setHome({ ...objectCopy, [key1]: { ...objectCopy[key1], [key2]: item } });
  }

  // Agrega citas al array de citas de home.citas
  function getCita(obj) {
    let objectCopy = { ...home };
    if (objectCopy.citas > 0 || objectCopy.citas !== undefined) {
      objectCopy.citas.push(obj);
    } else {
      objectCopy.citas = [];
      objectCopy.citas.push(obj);
    }
    setHome(objectCopy);
  }

  // traer devuelta un array con las citas que quedan y sustituyo el antigup
  function citasBorradas(arr) {
    let objectCopy = { ...home };
    objectCopy.citas = arr;
    setHome(objectCopy);
  }
  return (
    <div className="mt-5">
      <Header updateHome={updateHome} />
      <Subheader updateHome={updateHome} />
      <Citas getCita={getCita} />
      <BorrarCitas citasArray={home.citas} citasBorradas={citasBorradas} />
    </div>
  );
};

export default HomeEditForm;
