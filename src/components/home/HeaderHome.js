import React from "react";
import { Link } from "react-router-dom";
import "../../components/home/HeaderHome.css";

const HeaderHome = ({ header }) => {
  let fondo = {
    backgroundImage: `url(${header.image})`,
    backgroundSize: "cover",
    minHeight: "95vh",
  };

  return (
    <>
      <div className="container-fluid" style={fondo}>
        <div className="row">
          <span className="texto-header col-md-6 text-light">
            {header.cita}
          </span>
          <div className="col-md-12">
            <div className="btn">
              <Link to="/catalogo">
                <button type="button" className="boton">
                  Ver catálogo de DJ's
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderHome;
