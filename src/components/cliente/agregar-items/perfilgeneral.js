import React, { useState, useContext } from "react";
import { Context } from "../../../store/appContext";
import { useForm } from "react-hook-form";
import unknownUserImagePath from "./unknown-user.jpg";
// import { EditarPerfil } from "../../../views/dj/editar_perfil";

const validacionImagen = (
  <small className="text-danger pl-1">Elije una foto de perfil por favor</small>
);

const validacionOk = (
  <small className="text-success pl-1">Perfil creado!</small>
);

const ProfileEditor = ({ updateProfile }) => {
  const { store } = useContext(Context);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageval, setImageval] = useState(false);
  const [ok, setOk] = useState(false);

  const { register, handleSubmit, errors, reset } = useForm();

  const onSubmit = (data) => {
    data.imagen = image;
    if (data.imagen === "") {
      return setImageval(true);
    }
    data.status = "active";
    console.log(data);
    reset({});
    setOk(true);
    setImageval(false);
    updateProfile(data);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "clients_preset");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/chilegigs/image/upload/",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };

  return (
    <div className="border border-dark p-3 rounded mt-2">
      <div className="d-flex justify-content-start mb-1 ml-4">
        <h3>Perfil</h3>
      </div>

      <div className="col-md-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row">
            <div className="col-md-3">
              <div className="col-md-12 mb-1">
                <div className="update-profile-image text-center">
                  {loading ? (
                    <img
                      src={
                        !!store.perfil.imagen && store.perfil.imagen.length > 0
                          ? store.perfil.imagen
                          : unknownUserImagePath
                      }
                      alt=""
                      className="img-thumbnail"
                      style={{ width: "300px" }}
                    />
                  ) : (
                    <img
                      src={image}
                      alt=""
                      className="img-thumbnail"
                      style={{ width: "300px" }}
                    />
                  )}
                </div>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  name="file"
                  className="custom-file-input"
                  id="customFile"
                  onChange={uploadImage}
                />
                <label className="custom-file-label" htmlFor="customFile">
                  Imagen
                </label>
                {imageval ? validacionImagen : null}
              </div>
            </div>
            <div className="col-md-9">
              <div className="form-row">
                <div className="col-md-6 mb-6">
                  <label htmlFor="nombre">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  {errors.nombre && (
                    <small className="text-danger">Nombre invalido</small>
                  )}
                </div>
                <div className="col-md-6 mb-6">
                  <label htmlFor="apellido">Apellido</label>
                  <input
                    type="text"
                    className="form-control"
                    name="apellido"
                    id="apellido"
                    placeholder="Apellido"
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  {errors.apellido && (
                    <small className="text-danger">Apellido invalido</small>
                  )}
                </div>
                <div className="col-md-6 mb-6">
                  <label htmlFor="rut">RUT o Número de Identificación</label>
                  <input
                    type="text"
                    className="form-control"
                    id="rut"
                    name="rut"
                    placeholder="Rut"
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  {errors.rut && (
                    <small className="text-danger">Rut invalido</small>
                  )}
                </div>
                <div className="col-md-6 mb-6">
                  <label htmlFor="nacionalidad">Nacionalidad</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nacionalidad"
                    id="nacionalidad"
                    placeholder="Nacionalidad"
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  {errors.nacionalidad && (
                    <small className="text-danger">Nacionalidad invalida</small>
                  )}
                </div>
                <div className="col-md-6 mb-6">
                  <label htmlFor="ciudad">Ciudad</label>
                  <input
                    type="text"
                    className="form-control"
                    id="ciudad"
                    name="ciudad"
                    placeholder="Ciudad"
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  {errors.ciudad && (
                    <small className="text-danger">Ciudad invalida</small>
                  )}
                </div>
                <div className="col-md-6 mb-6">
                  <label htmlFor="pais">País</label>
                  <input
                    type="text"
                    className="form-control"
                    name="pais"
                    id="pais"
                    placeholder="País"
                    ref={register({
                      required: true,
                      minLength: 3,
                      maxLength: 20,
                    })}
                  />
                  {errors.pais && (
                    <small className="text-danger">Pais invalido</small>
                  )}
                </div>
              </div>
              <button className="btn btn-primary mt-3" type="submit">
                Crear Perfil
              </button>
              {ok ? validacionOk : null}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditor;
