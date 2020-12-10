import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { ejemploPerfilCliente } from "../../placeholder/ejemploperfil";
import ProfileEditor from "./agregar-items/perfilgeneral";
import Biografia from "../dj/edit-profile/biografia";

const ClientProfileEditor = () => {
  const { store, actions } = useContext(Context);
  // acá tiene que llegar el perfil del usuario
  const [perfil, setPerfil] = useState(store.perfil);

  function updateProfile(obj) {
    let objCopy = { ...perfil };
    setPerfil({ ...objCopy, ...obj });
    // aca tiene que ir el PUT
  }

  return (
    <div className="container">
      <ProfileEditor updateProfile={updateProfile} />
      <Biografia updateProfile={updateProfile} />
    </div>
  );
};

export default ClientProfileEditor;
