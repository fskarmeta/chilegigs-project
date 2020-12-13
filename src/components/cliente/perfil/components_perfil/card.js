import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import ReactStars from "react-stars";

const ClientProfileCard = ({
  nombre,
  apellido,
  imagen,
  ciudad,
  pais,
  rating,
  contrataciones,
}) => {
  return (
    <Card className="border rounded">
      <Card.Img variant="top" src={imagen && imagen} />
      <Card.Body>
        <Card.Title className="text-center">{`${nombre && nombre}, ${
          apellido && apellido
        }`}</Card.Title>
        <Card.Text>
          <div className="col-md-12 d-flex justify-content-center">
            <span>
              {ciudad && ciudad}, {pais && pais}
            </span>
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <ReactStars
              value={(rating && rating) / (contrataciones && contrataciones)}
              size={24}
              edit={false}
            />
          </div>
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <span>Contrataciones: </span>
            <span>{contrataciones && contrataciones}</span>
          </div>
        </ListGroupItem>
      </ListGroup>
      {/* <Card.Body className="d-flex justify-content-center">
      </Card.Body> */}
    </Card>
  );
};

export default ClientProfileCard;
