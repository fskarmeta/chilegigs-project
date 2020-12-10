import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import Tarjeta from "./edit-profile/tarjeta";
import Biografia from "./edit-profile/biografia";
import Detalles from "./edit-profile/detalles";
import Requisitos from "./edit-profile/requisitos";
import DatosPersonales from "./edit-profile/datospersonales";
//Estos son placeholder que representan ambos items que deberían estar en el store
// import { objetosGlobales } from "../../placeholder/objetoglobal";
// import { ejemploPerfil } from "../../placeholder/ejemploperfil";

const ProfileEditor = () => {
  //setear al objetoglobal el fetch del objeto global de requisitos
  const { store, actions } = useContext(Context);

  const [status, setStatus] = useState(store.perfil_status);

  const [objetoGlobal, setObjetosGlobal] = useState(store.requisitos);
  //setear acá el perfil del usurio actual desde el store
  const [perfil, setPerfil] = useState(store.perfil);

  // useeffect fetch de perfil y/o objetos globales
  useEffect(() => {
    return () => {
      actions.fetchIndividualDjProfileAfterLogin(store.user_id, store.token);
      console.log("unmount");
    };
  }, []);

  useEffect(() => {
    setPerfil(store.perfil);
    return () => {
      setPerfil(store.perfil);
    };
  }, [perfil]);

  function updateProfile(obj) {
    console.log(obj);
    let objCopy = { ...perfil };
    //boorar esto?
    setPerfil({ ...objCopy, ...obj });
    //
    //al hacer el put de perfil
    actions.updateProfile({ ...objCopy, ...obj });
    actions.fetchIndividualDjProfileAfterLogin(store.user_id, store.token);
    store.perfil_status = "active";
  }

  // aplicar fetch PUT y luego Get (al perfil)
  function updateRequisitosProfile(key, item) {
    let objectCopy = { ...perfil };
    // borrar esto?
    setPerfil({
      ...objectCopy,
      requisitos: { ...objectCopy.requisitos, [key]: item },
    });

    actions.updateProfile({
      ...objectCopy,
      requisitos: { ...objectCopy.requisitos, [key]: item },
    });
    actions.fetchIndividualDjProfileAfterLogin(store.user_id, store.token);
  }
  return (
    <div className="container">
      {store.perfil_status === "inactive" ? (
        <h4 className="text-center m-3">
          Porfavor crea un perfil para activar tu cuenta
        </h4>
      ) : null}
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
