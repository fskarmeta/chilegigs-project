import { Card } from "react-bootstrap";

const GeneralEspectaculo = ({
  servicios,
  dur_min,
  dur_max,
  staff,
  viajes,
  arriendo,
}) => {
  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title>General del Espectáculo</Card.Title>
        <div className="row">
          <div className="col-md-4 d-flex flex-column">
            <span className=" mb-1">Servicios:</span>
            <span className="">
              <div>
                {!!servicios &&
                  servicios.map((item, index) => (
                    <li
                      key={index}
                      className="font-weight-light "
                      style={{ listStyleType: "none" }}
                    >
                      {item}
                    </li>
                  ))}
              </div>
            </span>
          </div>

          <div className="col-md-4 d-flex flex-column">
            <span className="">Duración Minima:</span>
            <span className=" font-weight-light">{!!dur_min && dur_min}</span>
          </div>

          <div className="col-md-4 d-flex flex-column">
            <span className="">Duración Máxima:</span>
            <span className=" font-weight-light">
              {!!dur_max && dur_max ? dur_max : "0"}
            </span>
          </div>

          <div className="col-md-4 d-flex flex-column">
            <span className="">Integrantes Staff:</span>
            <span className=" font-weight-light">{staff && staff}</span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="">Viajes:</span>
            <span className=" font-weight-light">{!!viajes && viajes}</span>
          </div>
          <div className="col-md-4 d-flex flex-column">
            <span className="">Arrienda Equipos:</span>
            <span className=" font-weight-light">{!!arriendo && arriendo}</span>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default GeneralEspectaculo;
