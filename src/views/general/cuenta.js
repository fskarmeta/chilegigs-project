import DatosCuenta from "../../components/general/datos_cuenta";
import CambiarClaveEnCuenta from "../../components/general/cambiar_clave_cuenta";
import BorrarCuenta from "../../components/general/borrar_cuenta";

export const Cuenta = () => {
  return (
    <div className="container text-center">
      <DatosCuenta />
      <CambiarClaveEnCuenta />
      <BorrarCuenta />
    </div>
  );
};
