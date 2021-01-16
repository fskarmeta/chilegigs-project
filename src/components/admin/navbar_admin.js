import { Link } from "react-router-dom";

export const AdminNav = () => {
  return (
    <div className="row">
      <div className="border-right border-dark col-md-12">
        <div className="row d-flex flex-column border-bottom border-dark">
          <div className="btn">
            <Link className="btn" to="../admin">
              <i className="fas fa-globe-americas fa-3x"></i>
            </Link>
          </div>
          <span className="m-1 font-weight-bold align-self-center">
            General
          </span>
        </div>
        <div className="row d-flex flex-column border-bottom border-dark">
          <Link className="btn" to="../admin/home">
            <i className="fas fa-home fa-3x"></i>
          </Link>
          <span className="m-1 font-weight-bold align-self-center">Home</span>
        </div>
        <div className="row d-flex flex-column border-bottom border-dark">
          <div className="btn">
            <Link className="btn" to="../admin/djs">
              <i className="fas fa-record-vinyl fa-3x"></i>
            </Link>
          </div>
          <span className="align-self-center font-weight-bold">DJ's</span>
        </div>
        <div className="row d-flex flex-column border-bottom border-dark">
          <div className="btn">
            <Link className="btn" to="../admin/clients">
              <i className="fas fa-users fa-3x"></i>
            </Link>
          </div>
          <span className="align-self-center font-weight-bold">Clientes</span>
        </div>
        <div className="row d-flex flex-column border-bottom border-dark">
          <div className="btn">
            <Link className="btn" to="../admin/gigs">
              <i className="fas fa-list fa-3x"></i>
            </Link>
          </div>
          <span className="align-self-center font-weight-bold">Gigs</span>
        </div>
        <div className="row d-flex flex-column border-bottom border-dark">
          <Link className="align-self-center btn" to="../admin/raider">
            <i className="fas fa-edit fa-3x"></i>
          </Link>
          <span className="align-self-center font-weight-bold">Raider</span>
        </div>
      </div>
    </div>
  );
};
