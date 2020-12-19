import { Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactStars from "react-stars";

const DjProfileCard = ({
  imagen,
  artista,
  ciudad,
  pais,
  rating,
  contrataciones,
  tecnica,
  generos,
  instagram,
  soundcloud,
  mixcloud,
  username,
}) => {
  return (
    <Card className="border rounded" style={{ height: "40rem" }}>
      <Link to={`/dj/profile/${username}`}>
        <Card.Img
          variant="top"
          src={!!imagen && imagen}
          style={{ maxHeight: "20rem" }}
        />
      </Link>
      <Card.Body>
        <Link
          to={`/dj/profile/${username}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card.Title className="text-center">{artista && artista}</Card.Title>
        </Link>
        <Card.Text className="mb-2">
          <div className="col-md-12 d-flex justify-content-center">
            <span>
              {ciudad}, {pais}
            </span>
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <ReactStars
              value={
                (!!rating && rating) / (!!contrataciones && contrataciones)
              }
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
            <span>{!!contrataciones && contrataciones}</span>
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <span>Tecnica: </span>
            <span>{!!tecnica && tecnica}</span>
          </div>
        </ListGroupItem>
        <ListGroupItem>
          <div className="d-flex justify-content-between">
            <span className="mr-2">Generos: </span>
            <span>
              {!!generos &&
                generos.map((gen, index) => (
                  <small>
                    <span key={index}>{`${gen} / `}</span>
                  </small>
                ))}
            </span>
          </div>
        </ListGroupItem>
      </ListGroup>
      <Card.Body className="d-flex justify-content-center">
        {!!soundcloud && soundcloud.length > 27 ? (
          <Card.Link href={soundcloud} target="_blank">
            <i
              style={{ color: "black" }}
              className="fab fa-soundcloud fa-2x"
            ></i>
          </Card.Link>
        ) : null}
        {!!mixcloud && mixcloud.length > 27 ? (
          <Card.Link href={mixcloud} target="_blank">
            <i style={{ color: "black" }} className="fab fa-mixcloud fa-2x"></i>
          </Card.Link>
        ) : null}
        {!!instagram && instagram.length > 27 ? (
          <Card.Link href={instagram} target="_blank">
            <i
              style={{ color: "black" }}
              className="fab fa-instagram fa-2x dark"
            ></i>
          </Card.Link>
        ) : null}
      </Card.Body>
    </Card>
  );
};

export default DjProfileCard;
