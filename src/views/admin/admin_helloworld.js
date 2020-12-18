import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";

import { AdminNav } from "../../components/admin/navbar_admin";

export const HelloWorld = () => {
  const { store } = useContext(Context);
  let history = useHistory();

  useEffect(() => {
    if (store.role !== "admin") {
      history.push("/");
    }
  });
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminNav />
        </div>
        <div className="col-md-11">Hola mundo</div>
      </div>
    </div>
  );
};
