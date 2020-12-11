const { Modal } = require("react-bootstrap");

const RecuperacionExitosa = ({ routerAfterRecuperacion }) => {
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>
          <span>Se te ha enviado un mail con un link de recuperación</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-center">
          <span
            className="btn btn-success"
            onClick={() => routerAfterRecuperacion()}
          >
            Continuar
          </span>
        </div>
      </Modal.Body>
    </>
  );
};

export default RecuperacionExitosa;
