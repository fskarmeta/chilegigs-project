import React from 'react';

const Carrusel = ({ citas }) => {
  return (
    <div className="caja">
      <div className="container-fluid caja2 mt-5"
        style={{
          background: 'black',
          width: '100%',
          height: '500px'
        }}
      >
        <div className="djs" style={{ color: 'white', marginLeft: '138px', paddingTop: '50px' }}>
          <h1>Te presentamos a algunos de nuestros DJ's</h1>
        </div>
        <div
          id="carouselExampleControls"
          className="carousel slide carrusel mt-2"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            {citas &&
              citas.map((cita, index) => (
                <div className="carousel-item active" key={index}>
                  <div
                    className="card mb-3"
                    style={{ width: '80%', height: '80%', margin: '0px auto', background: 'none', color: 'white', }}
                  >
                    <div className="row no-gutters">
                      <div className="col-md-4">
                        <img
                          src={cita.imagen}
                          className="card-img"
                          alt="..."
                        />
                        <p className="text-center mt-3">
                          <strong>{cita.nombre}</strong>
                        </p>
                      </div>
                      <div className="col-md-8">
                        <div className="card-body">
                          <h5 className="card-title">{cita.nombre}</h5>
                          <p className="card-text">{cita.cita}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carrusel;