import React, { useState } from "react";
import Tarjeta from "./edit-profile/tarjeta";
import Biografia from "./edit-profile/biografia";
import Detalles from "./edit-profile/detalles";
import Requisitos from "./edit-profile/requisitos";
import DatosPersonales from "./edit-profile/datospersonales";
//Estos son placeholder que representan ambos items que deberían estar en el store
import { objetosGlobales } from "../../placeholder/objetoglobal";
import { ejemploPerfil } from "../../placeholder/ejemploperfil";

const ProfileEditor = () => {
  //setear al objetoglobal el fetch del objeto global de requisitos
  const [objetoGlobal, setObjetosGlobal] = useState(objetosGlobales);
  //setear acá el perfil del usurio actual desde el store
  const [perfil, setPerfil] = useState(ejemploPerfil);

  // aplicar fetch PUT y luego Get (al perfil)
  function updateProfile(obj) {
    console.log(obj);
    let objCopy = { ...perfil };
    setPerfil({ ...objCopy, ...obj });
  }

  // aplicar fetch PUT y luego Get (al perfil)
  function updateRequisitosProfile(key, item) {
    let objectCopy = { ...perfil };
    setPerfil({
      ...objectCopy,
      requisitos: { ...objectCopy.requisitos, [key]: item },
    });
  }
  return (
    <div className="container">
      <Tarjeta updateProfile={updateProfile} />
      <Biografia updateProfile={updateProfile} />
      <Detalles updateProfile={updateProfile} />
      <Requisitos
        objetoGlobal={objetoGlobal}
        perfil={perfil}
        updateRequisitosProfile={updateRequisitosProfile}
      />
      <DatosPersonales updateProfile={updateProfile} />
    </div>
  );
};

export default ProfileEditor;
