import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";

import CategoryEditForm from "../../components/admin/CategoryEdit";
import { AdminNav } from "../../components/admin/navbar_admin";
export const Raider = () => {
  const { store } = useContext(Context);
  let history = useHistory();

  useEffect(() => {
    if (store.role !== "admin") {
      history.push("/");
    }
  });

  return (
    <div className="container-fluid mb-5">
      <div className="row">
        <div className="col-md-1">
          <AdminNav />
        </div>
        <div className="col-md-11">
          <div className="container w-75 mt-3">
            <CategoryEditForm />
          </div>
        </div>
      </div>
    </div>
  );
};
