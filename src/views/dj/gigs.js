import ListaGigs from "../../components/dj/gigs/lista_gigs";

const Gigs = () => {
  return (
    <div className="container">
      <div className="row m-3">
        <h3>Gigs</h3>
      </div>
      <div className="row">
        <ListaGigs />
      </div>
    </div>
  );
};

export default Gigs;
