import React, { useState } from "react";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import "bootstrap/dist/css/bootstrap.min.css";

const validacionLink = (
  <small className="text-danger pl-1">Link incorrecto</small>
);

const todoOk = <small className="text-success pl-1">Todo ok !</small>;

const AgregarCancion = ({ updateProfile }) => {
  const [value, setValue] = useState(2);
  const [link, setLink] = useState("");
  const [linkval, setLinkval] = useState(false);
  const [ok, setOk] = useState(false);

  const handleChange = (val) => setValue(val);

  function actualizarDatos() {
    let linkCopy = link;
    if (value === 1) {
      if (linkCopy === "") {
        return setLinkval(true);
      }
      if (
        !/https?:\/\/(www\.)?[mixcloud\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/.test(
          linkCopy
        )
      ) {
        return setLinkval(true);
      } else {
        let finalLink = linkCopy.match(/(?<=com).+/g);
        setLinkval(false);
        setOk(true);
        let obj = { agregar_cancion: true, url_cancion: finalLink[0] };
        updateProfile(obj);
      }
    }
    if (value === 2) {
      setLinkval(false);
      setOk(true);
      let obj = { agregar_cancion: false, url_cancion: "nada" };
      updateProfile(obj);
    }
  }

  return (
    <div className="border border-dark p-3 mt-2 rounded">
      <div className="d-flex justify-content-start mb-1 ml-1">
        <h3>Agregar Mix</h3>
      </div>

      <div className="col-md-12">
        <div className="d-flex flex-column">
          <span>Agregar mix desde Mixcloud a mi perfil</span>
          <div>
            <ToggleButtonGroup
              type="radio"
              name="options"
              defaultValue={2}
              value={value}
              onChange={handleChange}
              color="black"
              className="mt-2"
            >
              <ToggleButton value={1} variant="secondary">
                Si
              </ToggleButton>
              <ToggleButton value={2} variant="secondary">
                No
              </ToggleButton>
            </ToggleButtonGroup>
          </div>
          <input
            type="text"
            className="form-control mt-4"
            placeholder="https://www.mixcloud.com/tu-perfil/tu-mix/"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          {linkval ? validacionLink : null}
        </div>
        <span
          name="mandar-info-tarjeta"
          className="btn btn-primary mt-4"
          role="button"
          onClick={actualizarDatos}
        >
          Actuarlizar Datos
        </span>
        {ok ? todoOk : null}
      </div>
    </div>
  );
};

export default AgregarCancion;
