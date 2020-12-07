import React, { useState } from "react";
import unknownUserImagePath from "./unknown-user.jpg";
import Select from "react-select";
import { estilosOptions, serviciosOptions, tecnicaOptions } from "./items";

const campoObligatorio = (
  <small className="text-danger pl-1">Campo Obligatorio</small>
);

const validacionEstilos = (
  <small className="text-danger pl-1">Minimo uno, máximo tres</small>
);

const validacionServicios = (
  <small className="text-danger pl-1">Minimo un servicio</small>
);

const validacionTecnica = (
  <small className="text-danger pl-1">Elije una porfavor</small>
);

const validacionSocialMedia = (
  <small className="text-danger pl-1">
    Sin espacios o caracteres especiales
  </small>
);

const validacionLink = (
  <small className="text-danger pl-1">Link incorrecto</small>
);

const validacionImagen = (
  <small className="text-danger pl-1">Elije una porfavor</small>
);

const validacionTarjeta = (
  <small className="text-success mt-1">Tarjeta actualizada!</small>
);

function minusculaCapitalizar(string) {
  return string.charAt(0).toUpperCase() + string.toLowerCase().slice(1);
}
const Tarjeta = ({ updateProfile }) => {
  // const [tarjeta, setTarjeta] = useState({});
  //artista y validacion
  const [artista, setArtista] = useState("");
  const [artistaval, setArtistaval] = useState(false);
  //ciudad y validacion
  const [ciudad, setCiudad] = useState("");
  const [ciudadval, setCiudadval] = useState(false);
  //pais y validacion
  const [pais, setPais] = useState("");
  const [paisval, setPaisval] = useState(false);
  //mixcloud y validacion
  const [mixcloud, setMixcloud] = useState("");
  const [mixcloudval, setMixcloudval] = useState(false);

  //soundcloud y validacion
  const [soundcloud, setSoundcloud] = useState("");
  const [soundcloudval, setSoundcloudval] = useState(false);
  //spotify y validacion
  const [instagram, setInstagram] = useState("");
  const [instagramval, setInstagramval] = useState(false);
  //estilos y validacion
  const [estilos, setEstilos] = useState([]);
  const [estilosval, setEstilosval] = useState(false);
  //servicios y validacion
  const [servicios, setServicios] = useState([]);
  const [serviciosval, setServiciosval] = useState(false);
  //tecnica y validacion
  const [tecnica, setTecnica] = useState("");
  const [tecnicaval, setTecnicaval] = useState(false);

  //agregar link o no
  const [agregar, setAgregar] = useState(false);

  //link y validacion
  const [link, setLink] = useState("");
  const [linkval, setLinkval] = useState(false);

  //imagenes
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(true);
  const [imageval, setImageval] = useState(false);

  // todo valido
  const [tarjetaval, setTarjetaval] = useState(false);

  // funcion para subir imagen

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "profiles_preset");
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

  function mandarTarjeta() {
    let imageCopy = image;
    if (imageCopy === "") {
      return setImageval(true);
    }
    if (artista.length < 3 || artista.length > 20) {
      return setArtistaval(true);
    }
    if (ciudad.length < 3 || ciudad.length > 20) {
      return setCiudadval(true);
    }
    if (pais.length < 3 || pais.length > 20) {
      return setPaisval(true);
    }
    if (mixcloud !== "") {
      if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim.test(mixcloud)) {
        return setMixcloudval(true);
      }
    }
    if (soundcloud !== "") {
      if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim.test(mixcloud)) {
        return setSoundcloudval(true);
      }
    }
    if (instagram !== "") {
      if (!/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim.test(mixcloud)) {
        return setInstagramval(true);
      }
    }
    if (estilos.length < 1 || estilos.length > 3) {
      return setEstilosval(true);
    }
    if (servicios.length < 1) {
      return setServiciosval(true);
    }
    if (tecnica === "") {
      return setTecnicaval(true);
    }
    let linkCopy = link;
    if (agregar) {
      if (linkCopy === "") {
        return setLinkval(true);
      }
      if (
        !/https?:\/\/(www\.)?[mixcloud\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
          linkCopy
        )
      ) {
        return setLinkval(true);
      }
    }

    setArtistaval(false);
    setCiudadval(false);
    setPaisval(false);
    setMixcloudval(false);
    setSoundcloudval(false);
    setInstagramval(false);
    setEstilosval(false);
    setServiciosval(false);
    setTecnicaval(false);
    setLinkval(false);
    setTarjetaval(true);

    let estilosFinales = [];
    for (let el of estilos) {
      estilosFinales.push(el.label);
    }
    let serviciosFinales = [];
    for (let el of servicios) {
      serviciosFinales.push(el.label);
    }

    // setTarjeta({
    //   status: "active",
    //   artista: artista,
    //   ciudad: minusculaCapitalizar(ciudad),
    //   pais: minusculaCapitalizar(pais),
    //   mixcloud: `https://www.mixcloud.com/${mixcloud}`,
    //   soundcloud: `https://soundcloud.com/${soundcloud}`,
    //   instagram: `https://www.instagram.com/${instagram}`,
    //   estilos: estilosFinales,
    //   servicios: serviciosFinales,
    //   tecnica: tecnica.label,
    //   agregar_cancion: agregar,
    //   link: link,
    // });

    updateProfile({
      status: "active",
      artista: artista,
      ciudad: minusculaCapitalizar(ciudad),
      pais: minusculaCapitalizar(pais),
      mixcloud: `https://www.mixcloud.com/${mixcloud}`,
      soundcloud: `https://soundcloud.com/${soundcloud}`,
      instagram: `https://www.instagram.com/${instagram}`,
      estilos: estilosFinales,
      servicios: serviciosFinales,
      tecnica: tecnica.label,
      agregar_cancion: agregar,
      url_cancion: link,
      imagen: image,
    });
    setArtista("");
    setCiudad("");
    setPais("");
    setMixcloud("");
    setSoundcloud("");
    setInstagram("");
    setEstilos([]);
    setServicios([]);
    setTecnica("");
    setLink("");
  }
  return (
    <div className="border border-dark p-3 rounded mt-2">
      <div className="d-flex justify-content-start mb-1 ml-4">
        <h3>Tarjeta</h3>
      </div>

      <div className="col-md-12">
        <div className="row">
          <div className="col-md-3">
            <div className="col-md-12 mb-1">
              <div className="update-profile-image text-center">
                {loading ? (
                  <img
                    src={unknownUserImagePath}
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
            <form>
              <div className="form-row mt-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Nombre de artista*"
                    value={artista}
                    onChange={(e) => setArtista(e.target.value)}
                  />
                  {artistaval ? campoObligatorio : null}
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Ciudad*"
                    value={ciudad}
                    onChange={(e) => setCiudad(e.target.value)}
                  />
                  {ciudadval ? campoObligatorio : null}
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control "
                    placeholder="Pais*"
                    value={pais}
                    onChange={(e) => setPais(e.target.value)}
                  />
                  {paisval ? campoObligatorio : null}
                </div>
              </div>
              <div className="form-row mt-5 mb-2">
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre usuario Mixcloud"
                    value={mixcloud}
                    onChange={(e) => setMixcloud(e.target.value)}
                  />
                  {mixcloudval ? validacionSocialMedia : null}
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre usuario SoundCloud"
                    value={soundcloud}
                    onChange={(e) => setSoundcloud(e.target.value)}
                  />
                  {soundcloudval ? validacionSocialMedia : null}
                </div>
                <div className="col-md-4">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Nombre usuario Instagram"
                    value={instagram}
                    onChange={(e) => setInstagram(e.target.value)}
                  />
                  {instagramval ? validacionSocialMedia : null}
                </div>
              </div>
              <div className="form-row mt-5 mb-2">
                <div className="col-md-4">
                  <Select
                    isMulti
                    name="estilos"
                    options={estilosOptions}
                    className="multi-select-estilos"
                    classNamePrefix="select-estilos"
                    placeholder="Estilos*"
                    value={estilos}
                    onChange={setEstilos}
                  />
                  {estilosval ? validacionEstilos : null}
                </div>
                <div className="col-md-4">
                  <Select
                    isMulti
                    name="servicios"
                    options={serviciosOptions}
                    className="multi-select-servicios"
                    classNamePrefix="select-servicios"
                    placeholder="Servicios*"
                    value={servicios}
                    onChange={setServicios}
                  />
                  {serviciosval ? validacionServicios : null}
                </div>
                <div className="col-md-4">
                  <Select
                    name="tecnica"
                    options={tecnicaOptions}
                    className="single-select-tecnica"
                    classNamePrefix="select-tecnica"
                    placeholder="Tecnica*"
                    value={tecnica}
                    onChange={setTecnica}
                  />
                  {tecnicaval ? validacionTecnica : null}
                </div>
              </div>
              <div className="form-row mt-5 mb-2">
                <div className="col-md-10">
                  <div className="ml-4">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="inlineCheckbox1"
                      value="true"
                      onChange={() => setAgregar(true)}
                    />
                    <label>Agregar mix desde Mixcloud a mi perfil</label>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="https://www.mixcloud.com/tu-perfil/tu-mix/"
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                  />
                  {linkval ? validacionLink : null}
                </div>
              </div>
              <div className="form-row mt-3">
                <div className="col-md-10 d-flex flex-column">
                  <div>
                    <span
                      name="mandar-info-tarjeta"
                      className="btn btn-primary mt-4"
                      role="button"
                      onClick={mandarTarjeta}
                    >
                      Crear Perfil
                    </span>
                  </div>
                  {tarjetaval ? validacionTarjeta : null}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tarjeta;
