import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Header } from "./edit-home/header";
import { Subheader } from "./edit-home/subheader";
import { Citas } from "./edit-home/citas";
import { BorrarCitas } from "./edit-home/borrar-citas";
// importacion de objeto de ejemplo
// import Home from "../../placeholder/homeobject";

// falta agregar los fetch , token y path's
const HomeEditForm = () => {
  const { store, actions } = useContext(Context);
  const [home, setHome] = useState(store.home);

  useEffect(() => {
    setHome(store.home);
  }, [home]);

  function homeToServer(obj) {
    console.log(obj);
    fetch(`${store.fetchUrl}objetos/home`, {
      method: "PUT",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${store.token}`,
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.msg) {
          console.log(data.msg);
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
    actions.getGlobalObjects();
  }
  // Ejemplo: key1 = "header", key2 = "cita", item = "La mejor página" | Actualiza propiedad del objeto
  function updateHome(key1, key2, item) {
    let objectCopy = { ...home };
    //borarr ?
    // setHome({ ...objectCopy, [key1]: { ...objectCopy[key1], [key2]: item } });
    //aca hacer put al home en el back
    homeToServer({
      ...objectCopy,
      [key1]: { ...objectCopy[key1], [key2]: item },
    });
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
    // Borrar?
    setHome(objectCopy);
    //
    homeToServer(objectCopy);
  }

  // traer devuelta un array con las citas que quedan y sustituyo el antiguo
  function citasBorradas(arr) {
    let objectCopy = { ...home };
    objectCopy.citas = arr;
    // borrar?
    // setHome(objectCopy);
    //
    // put al home
    homeToServer(objectCopy);
  }
  return (
    <div className="mt-5">
      <Header updateHome={updateHome} />
      <Subheader updateHome={updateHome} />
      <Citas getCita={getCita} />
      <BorrarCitas
        citasArray={!!home.citas && home.citas}
        citasBorradas={citasBorradas}
      />
    </div>
  );
};

export default HomeEditForm;
