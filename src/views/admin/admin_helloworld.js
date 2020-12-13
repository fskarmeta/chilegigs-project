import { AdminNav } from "../../components/admin/navbar_admin";

export const HelloWorld = () => {
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
