import ListaContrataciones from "../../components/cliente/contrataciones/lista_contrataciones";

const Contrataciones = () => {
  return (
    <div className="container">
      <div className="row m-3">
        <h3>Contrataciones</h3>
      </div>
      <div className="row">
        <ListaContrataciones />
      </div>
    </div>
  );
};

export default Contrataciones;
