import React, { useContext } from "react";
import { Context } from "../../store/appContext";

const DatosCuenta = () => {
  const { store } = useContext(Context);
  return (
    <div class="row">
      <div class="col-sm-12">
        <div class="card border-0">
          <div class="card-body">
            <h5 class="card-title">Tus Datos</h5>
            <div class="card-text">
              <div className="d-flex flex-column">
                <div>
                  <span className="font-weight-bold">Nombre de usuario: </span>
                  <span>{store.username}</span>
                </div>
                <div>
                  <span className="font-weight-bold">Email: </span>
                  <span>{store.cuenta.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatosCuenta;
