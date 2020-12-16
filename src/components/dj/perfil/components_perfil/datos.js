import { Card } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const DatosPersonales = ({
  nombre,
  apellido,
  nacionalidad,
  celular,
  rut,
  calle,
  numero,
  ciudad,
  region,
  pais,
  datosPrivados,
}) => {
  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title>
          Datos Personales{" "}
          <Tippy content="Solo podrás verlo si has contratado al Dj">
            <i class="fas fa-info-circle"></i>
          </Tippy>
        </Card.Title>
        <Card.Text>
          {datosPrivados ? (
            <div className="row">
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Nombre:</span>
                <span className=" font-weight-light">{!!nombre && nombre}</span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Apellido:</span>
                <span className=" font-weight-light">
                  {!!apellido && apellido}
                </span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Nacionalidad:</span>
                <span className=" font-weight-light">
                  {!!nacionalidad && nacionalidad}
                </span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Celular:</span>
                <span className=" font-weight-light">
                  {!!celular && celular}
                </span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">N° de identificación:</span>
                <span className=" font-weight-light">{!!rut && rut}</span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Calle:</span>
                <span className=" font-weight-light">{!!calle && calle}</span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">N°:</span>
                <span className=" font-weight-light">{!!numero && numero}</span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Ciudad:</span>
                <span className=" font-weight-light">{!!ciudad && ciudad}</span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Region:</span>
                <span className=" font-weight-light">{!!region && region}</span>
              </div>
              <div className="col-md-3 mt-1 d-flex flex-column">
                <span className="">Pais:</span>
                <span className=" font-weight-light">{!!pais && pais}</span>
              </div>
            </div>
          ) : (
            <span>No tienes acceso a estos datos</span>
          )}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default DatosPersonales;
