import React from "react";
import Carousel from "react-bootstrap/Carousel";
const Carrusel = ({ citas }) => {
  return (
    <Carousel>
      {citas &&
        citas.map((cita, index) => (
          <Carousel.Item key={index} style={{ height: "65vh" }}>
            <img
              className="d-block w-100 imagen-carrusel"
              src={cita.imagen}
              alt="First slide"
            />
            <Carousel.Caption>
              <h3>{cita.nombre}</h3>
              <p>{cita.cita}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
    </Carousel>
  );
};

export default Carrusel;
