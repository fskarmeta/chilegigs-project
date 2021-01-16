import React, { useState } from "react";
// import { ejemploPerfilCliente } from "../../testitem.js";
import ClientProfileCard from "./components_perfil/card";
import Bio from "./components_perfil/bio";
import Mensajes from "./components_perfil/mensajes";

const ClientPerfil = ({ fetchProfile, feedback }) => {
  const [profile] = useState(fetchProfile);
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-4">
          <ClientProfileCard
            nombre={profile.nombre}
            apellido={profile.apellido}
            imagen={profile.imagen}
            ciudad={profile.ciudad}
            pais={profile.pais}
            rating={profile.suma_rating}
            contrataciones={profile.contrataciones}
          />
        </div>
        <div className="col-md-8">
          <Bio biografia={profile.biografia} />
          <Mensajes mensajes={feedback} />
        </div>
      </div>
      {/* <div className="row mt-5">
        <div className="col-md-8">
          <Mensajes mensajes={feedback} />
        </div>
      </div> */}
    </div>
  );
};

export default ClientPerfil;
