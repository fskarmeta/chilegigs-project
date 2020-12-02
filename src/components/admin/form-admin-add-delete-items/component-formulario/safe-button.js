export const SafeButton = ({ liftObjectForUpdate }) => {
  return (
    <div className="d-flex justify-content-center">
      <span
        className="btn btn-success text-center"
        role="button"
        onClick={liftObjectForUpdate}
      >
        Guardar Cambios
      </span>
    </div>
  );
};
