import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { EditCategories } from "./form-admin-add-delete-items/form-edit-categorias-admin";
// import { objetosGlobales } from "../../placeholder/objetoglobal";

//recordar agregar el useRed arriba
// const token = "";
// const fetchURL = "";

function CategoryEditForm() {
  const { store } = useContext(Context);

  const [global, setGlobal] = useState(store.requisitos);
  // const [ok, setOk] = useState(false);
  // fetch de los objetos

  useEffect(() => {
    fetch(`${store.fetchUrl}objetos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGlobal(data.requisitos);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, [store.fetchUrl]);

  function getGlobalObjects() {
    fetch(`${store.fetchUrl}objetos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setGlobal(data.requisitos);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }

  // actualizando el state con lo cambios y PUT fetch
  function updateGlobalState(attr, obj) {
    let globalCopy = { ...global };
    globalCopy[attr] = obj;
    // esto deberá ser el put
    // setGlobal(globalCopy);
    requisitosToServer(globalCopy);
    //mandar la actualización del fetch (here comes the PUT)
    //updateObject(globalCopy)
    getGlobalObjects();
  }

  function requisitosToServer(obj) {
    console.log(obj);
    fetch(`${store.fetchUrl}objetos/requisitos`, {
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
    getGlobalObjects();
  }
  return (
    <div className="row">
      <div className="col-md-4">
        <EditCategories
          titulo={"Equipos"}
          colorDeFondo={""}
          global={global.equipos}
          updateGlobalState={updateGlobalState}
          objectAttr={"equipos"}
        />
      </div>
      <div className="col-md-4">
        <EditCategories
          titulo={"Escenario"}
          colorDeFondo={""}
          global={global.escenario}
          updateGlobalState={updateGlobalState}
          objectAttr="escenario"
        />
      </div>
      <div className="col-md-4">
        <EditCategories
          titulo={"Food & Drinks"}
          colorDeFondo={""}
          global={global.foodanddrinks}
          objectAttr={"foodanddrinks"}
          updateGlobalState={updateGlobalState}
        />
      </div>
    </div>
  );
}
// }

export default CategoryEditForm;
