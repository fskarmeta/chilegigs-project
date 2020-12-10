import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { EditCategories } from "./form-admin-add-delete-items/form-edit-categorias-admin";
// import { objetosGlobales } from "../../placeholder/objetoglobal";

//recordar agregar el useRed arriba
// const token = "";
// const fetchURL = "";

function CategoryEditForm() {
  const { store, actions } = useContext(Context);

  const [global, setGlobal] = useState(store.requisitos);
  // const [ok, setOk] = useState(false);
  // fetch de los objetos

  // actualizando el state con lo cambios y PUT fetch
  function updateGlobalState(attr, obj) {
    let globalCopy = { ...global };
    globalCopy[attr] = obj;
    // esto deberá ser el put
    setGlobal(globalCopy);
    //mandar la actualización del fetch (here comes the PUT)
    //updateObject(globalCopy)
  }

  // const getObject = useRef(() => {});

  // getObject.current = () => {
  //   fetch(`${fetchURL}`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //   })
  //     .then((response) => {
  //       // console.log(response);
  //       return response.json();
  //     })
  //     .then((data) => {
  //       // console.log(data);
  //       setGlobal(data);
  //     })
  //     .catch((error) => {
  //       // console.log(error.message);
  //     });
  // };

  // fetch actualizar array en el back

  // const updateObject = (obj) => {
  //   fetch(`${fetchURL}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${token}`,
  //     },
  //     body: JSON.stringify(obj),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log(data))
  //     .catch((error) => console.log(error));
  // };
  // if (!ok) {
  //   return <div>Cargando componente</div>;
  // } else {
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
        />
      </div>
    </div>
  );
}
// }

export default CategoryEditForm;
