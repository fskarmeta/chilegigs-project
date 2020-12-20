import React, { useContext } from "react";
import { Context } from "../../../store/appContext";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

import Generador from "./agregar-items/generador";
const Requisitos = ({ objetoGlobal, perfil, updateRequisitosProfile }) => {
  const { store } = useContext(Context);
  return (
    <div className="border border-dark p-3 mt-2 rounded">
      <div className="d-flex justify-content-start mb-1 ml-1">
        <h3>Requisitos</h3>
        <div className="mt-1 ml-2">
          <Tippy content="Especifica a los clientes tus necesidades básicas">
            <i className="fas fa-info-circle"></i>
          </Tippy>
        </div>
      </div>

      <div className="col-md-12">
        <div className="row">
          <div className="col-xl-4 col-lg-12 col-md-12">
            <Generador
              titulo={"Equipos"}
              equipos={objetoGlobal.equipos}
              array={
                !!store.perfil.requisitos && store.perfil.requisitos.equipos
              }
              atributo={"equipos"}
              updateRequisitosProfile={updateRequisitosProfile}
            />
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12">
            <Generador
              titulo={"Escenario"}
              equipos={objetoGlobal.escenario}
              array={
                !!store.perfil.requisitos && store.perfil.requisitos.escenario
              }
              atributo={"escenario"}
              updateRequisitosProfile={updateRequisitosProfile}
            />
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12">
            <Generador
              titulo={"Food and Drinks"}
              equipos={objetoGlobal.foodanddrinks}
              array={
                !!store.perfil.requisitos &&
                store.perfil.requisitos.foodanddrinks
              }
              atributo={"foodanddrinks"}
              updateRequisitosProfile={updateRequisitosProfile}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Requisitos;
