import React, { useState } from "react";
import ReactStars from "react-stars";
import { Card } from "react-bootstrap";

// const mensajes = [
//   {
//     by_dj_commentary: "más o menosssss",
//     by_dj_rating: 3,
//     dia_evento: "2020-12-01T05:31:52.000Z",
//     dj_username: "Bafian",
//     id: 3,
//     nombre_evento: "probando feedback",
//   },
//   {
//     by_dj_commentary: "todo muy bien!",
//     by_dj_rating: 5,
//     dia_evento: "2020-12-13T18:59:20.000Z",
//     dj_username: "Bafian3",
//     id: 4,
//     nombre_evento: "Noche de la Luna en Club Sauna",
//   },
// ];

const Mensajes = ({ mensajes }) => {
  return (
    <>
      {/* <h5 className="m-2">Feedback</h5> */}
      {!!mensajes &&
        mensajes.map((feedback) => (
          <Card key={feedback.id}>
            <Card.Header className="d-flex justify-content-between">
              <div>{`Por ${feedback.client_username} el ${new Date(
                feedback.dia_evento
              ).toLocaleDateString()} para el evento "${
                feedback.nombre_evento
              }"`}</div>
              <div>
                <ReactStars
                  count={5}
                  half
                  size={24}
                  color2={"#ffd700"}
                  value={feedback.by_client_rating}
                  edit={false}
                />
              </div>
            </Card.Header>
            <Card.Body>
              <blockquote className="blockquote mb-0">
                <p>{feedback.by_client_commentary}</p>
              </blockquote>
            </Card.Body>
          </Card>
        ))}
    </>
  );
};

export default Mensajes;
