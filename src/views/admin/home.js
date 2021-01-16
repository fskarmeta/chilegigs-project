import React, { useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Context } from "../../store/appContext";
import HomeEditForm from "../../components/admin/HomeEdit";
import { AdminNav } from "../../components/admin/navbar_admin";
export const AdminHome = () => {
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
        <div className="col-md-11">
          <div className="container">
            <HomeEditForm />
          </div>
        </div>
      </div>
    </div>
  );
};
