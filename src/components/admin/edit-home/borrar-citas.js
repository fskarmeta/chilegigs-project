import React, { useState, useEffect, useContext } from "react";
import { Context } from "../../../store/appContext";

export const BorrarCitas = ({ citasArray, citasBorradas }) => {
  const { store } = useContext(Context);
  const [citas, setCitas] = useState(store.home.citas);
  //   const [current, setCurrent] = useState(Number);

  useEffect(() => {
    // setCitas(store.home.citas);
    return () => {
      setCitas(store.home.citas);
    };
  }, [store.home.citas]);
  // [citas, setCitas]
  function borrarCita(i) {
    if (citas) {
      let arrayCopy = [...citas];
      arrayCopy.splice(i, 1);
      // setCitas(arrayCopy);
      citasBorradas(arrayCopy);
      setCitas(store.home.citas);
    }
  }

  return (
    <div className="col-md-12 mb-5">
      <span className="font-weight-bold mb-3">Borrar Citas</span>
      {citas &&
        citas.map((cita, index) => (
          <div className="row" key={index}>
            <div className="col-md-3 d-flex flex-column">
              <span>Nombre:</span>
              <span className="font-weight-light">{cita.nombre}</span>
            </div>

            <div className="col-md-6 d-flex flex-column">
              <span>Cita:</span>
              <span className="font-weight-light">{cita.cita}</span>
            </div>
            <div className="col-md-3">
              <span
                name="updateBox"
                className="btn btn-danger mt-4"
                role="button"
                onClick={() => borrarCita(index)}
              >
                Borrar
              </span>
            </div>
          </div>
        ))}
    </div>
  );
};
