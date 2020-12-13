import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="container footer mt-5">
        <div className="row">
          <div className="col-md-12 text-center">
            <h1>ÚNETE A NUESTRO NEWSLETTER</h1>
          </div>
        </div>
        <div className="row text-center mt-5">
          <div className="col-md-6">
            <button type="button" className="btn btn-outline-info btn-lg mt-2">
              <i className="fas fa-envelope mx-2" />
              Correo electrónico
            </button>
          </div>
          <div className="col-md-6">
            <button type="button" className="btn btn-outline-info btn-lg mt-2">
              Suscribirse al Newsletter
            </button>
          </div>
        </div>
      </div>

      <br />

      <div className="nosotros">
        {/* <hr /> */}
        <div className="row text-center">
          <div className="col-md-12">
            <p>
              <i className="far fa-copyright mx-1 my-1" />
              2020 Chilegigs. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
