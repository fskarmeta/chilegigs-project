import { Card } from "react-bootstrap";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const RequisitosDj = ({ equipos, escenario, foodanddrinks }) => {
  return (
    <Card className="border-0">
      <Card.Body>
        <Card.Title>
          Requisitos{" "}
          <Tippy content="Cosas que el Dj espera que tengas a disposición, aunque todo es conversable :)">
            <i class="fas fa-info-circle"></i>
          </Tippy>
        </Card.Title>
        <Card.Text>
          <div className="row">
            <div className="col-md-4 d-flex flex-column">
              <span className="mb-1">Equipos: </span>
              <div>
                {!!equipos &&
                  equipos.map((item, index) => (
                    <li
                      key={index}
                      className="font-weight-light "
                      style={{ listStyleType: "none" }}
                    >
                      {item}
                    </li>
                  ))}
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column">
              <span className="mb-1">Escenario: </span>
              <div>
                {!!escenario &&
                  escenario.map((item, index) => (
                    <li
                      key={index}
                      className="font-weight-light "
                      style={{ listStyleType: "none" }}
                    >
                      {item}
                    </li>
                  ))}
              </div>
            </div>
            <div className="col-md-4 d-flex flex-column">
              <span className="mb-1">Food And Drinks:</span>
              <div>
                {!!foodanddrinks &&
                  foodanddrinks.map((item, index) => (
                    <li
                      key={index}
                      className="font-weight-light "
                      style={{ listStyleType: "none" }}
                    >
                      {item}
                    </li>
                  ))}
              </div>
            </div>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default RequisitosDj;
