import CambiarClave from "../../components/general/cambiarclave";

export const NuevaClave = () => {
  return (
    <div className="container">
      <div className="col-md-12 d-flex justify-content-center">
        <div className="d-flex flex-column">
          <h4 className="m-3">Recuperar contraseña</h4>
          <div className="col-md-12">
            <CambiarClave />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NuevaClave;
