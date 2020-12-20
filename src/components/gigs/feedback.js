import React, { useState } from "react";

import ReactStars from "react-stars";
import { Card, Button } from "react-bootstrap";

const campos = <small className="text-danger">Hay campos incompletos</small>;

const Feedback = ({ id, sendFeedback }) => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");

  const [warning, setWarning] = useState(false);

  const ratingChanged = (newRating) => {
    setRating(newRating);
  };

  function sendInfo() {
    if (rating === 0) {
      return setWarning(true);
    }
    if (message === "") {
      return setWarning(true);
    }
    let data = {
      rating: rating,
      message: message,
      gig_id: id,
    };
    setWarning(false);
    sendFeedback(data);
  }

  return (
    <div>
      <Card style={{ width: "50rem" }}>
        <Card.Header>Feedback</Card.Header>
        <Card.Body>
          <div className="col-md-12 d-flex justify-content-center mt-3">
            <Card.Title>Califica como fue la experiencia</Card.Title>
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <ReactStars
              count={5}
              value={rating}
              onChange={ratingChanged}
              size={60}
              color2={"#ffd700"}
              half={false}
            />
          </div>
          <div className="col-md-12 d-flex justify-content-center mt-3">
            <Card.Title>Deja un comentario</Card.Title>
          </div>
          <div className="col-md-12 d-flex justify-content-center">
            <textarea
              style={{ width: "35rem" }}
              id="biografia-perfil"
              rows="4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            ></textarea>
          </div>
          <div className="col-md-12 d-flex justify-content-center mt-3">
            <Button variant="primary" onClick={sendInfo}>
              Enviar
            </Button>
          </div>
        </Card.Body>
        <div className="col-md-12 d-flex justify-content-center">
          {warning ? campos : null}
        </div>
      </Card>
    </div>
  );
};

export default Feedback;
