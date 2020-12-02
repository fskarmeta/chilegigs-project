import React, { useState } from "react";
import { EditCategories } from "./form-admin-add-delete-items/form-edit-categorias-admin";
import { objetosGlobales } from "../../placeholder/objetoglobal";

//recordar agregar el useRed arriba
// const token = "";
// const fetchURL = "";

function CategoryEditForm() {
  const [global, setGlobal] = useState(objetosGlobales);

  // fetch de los objetos
  // useEffect(() => {
  //   getObject.current();
  // }, []);

  // actualizando el state con lo cambios y PUT fetch
  function updateGlobalState(attr, obj) {
    let globalCopy = { ...global };
    globalCopy[attr] = obj;
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

  return (
    <div className="row">
      <div className="col-md-4">
        <EditCategories
          titulo={"Equipos"}
          colorDeFondo={"rgba(224,224,224,0.2)"}
          global={global.equipos}
          updateGlobalState={updateGlobalState}
          objectAttr={"equipos"}
        />
      </div>
      <div className="col-md-4">
        <EditCategories
          titulo={"Escenario"}
          colorDeFondo={"rgba(224,224,224,0.2)"}
          global={global.escenario}
          updateGlobalState={updateGlobalState}
          objectAttr="escenario"
        />
      </div>
      <div className="col-md-4">
        <EditCategories
          titulo={"Food & Drinks"}
          colorDeFondo={"rgba(224,224,224,0.2)"}
          global={global.foodanddrinks}
          objectAttr={"foodanddrinks"}
        />
      </div>
    </div>
  );
}

export default CategoryEditForm;
