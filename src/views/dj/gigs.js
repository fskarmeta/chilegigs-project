import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import ListaGigs from "../../components/dj/gigs/lista_gigs";
import ListaContrataciones from "../../components/cliente/contrataciones/lista_contrataciones";

const Gigs = () => {
  const { store } = useContext(Context);
  return (
    <div className="container">
      <div className="row m-3">
        <h3>Gigs</h3>
      </div>
      <div className="row">
        <ListaGigs />
      </div>
    </div>
  );
};

export default Gigs;
