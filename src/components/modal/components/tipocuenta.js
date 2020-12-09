import "./elegircuenta.css";

const { Modal } = require("react-bootstrap");

const TipoDeCuenta = ({ mostrarCuentaDj, mostrarCuentaCliente }) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Elige un tipo de cuenta</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div
          className="card col mb-1 carta-cuenta-cliente"
          onClick={mostrarCuentaCliente}
        >
          <div className="card-body">
            <h5 className="card-title">Crear cuenta de Cliente</h5>
            <p className="card-text">
              Podrás navegar libremente por el catálogo de Dj's y contratarlos
              para tus eventos.
            </p>
          </div>
        </div>
        <div
          className="card col mb-1 carta-cuenta-dj"
          onClick={mostrarCuentaDj}
        >
          <div className="card-body">
            <h5 className="card-title">Crear cuenta de DJ</h5>
            <p className="card-text">
              Arma tu perfil, expone tus especialidades y podrás ser contratado
              para los eventos que desees.
            </p>
          </div>
        </div>
      </Modal.Body>
    </>
  );
};

export default TipoDeCuenta;
