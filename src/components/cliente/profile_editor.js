import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
// import { ejemploPerfilCliente } from "../../placeholder/ejemploperfil";
import ProfileEditor from "./agregar-items/perfilgeneral";
import Biografia from "../dj/edit-profile/biografia";

const ClientProfileEditor = () => {
  const { store, actions } = useContext(Context);
  // acá tiene que llegar el perfil del usuario
  const [perfil, setPerfil] = useState(store.perfil);

  // useEffect(() => {
  //   return () => {
  //     actions.fetchIndividualClientProfileAfterLogin(
  //       store.user_id,
  //       store.token
  //     );
  //   };
  // }, [actions, store.token, store.user_id]);

  function updateProfile(obj) {
    let objCopy = { ...perfil };
    setPerfil({ ...objCopy, ...obj });
    // aca tiene que ir el PUT
    actions.updateProfile({ ...objCopy, ...obj });
    actions.fetchIndividualClientProfileAfterLogin(store.user_id, store.token);
    store.perfil_status = "active";
  }

  return (
    <div className="container">
      {store.perfil_status === "inactive" ? (
        <h4 className="text-center m-3">
          Por favor crea un perfil para activar tu cuenta
        </h4>
      ) : null}
      <ProfileEditor updateProfile={updateProfile} />
      <Biografia updateProfile={updateProfile} />
    </div>
  );
};

export default ClientProfileEditor;
