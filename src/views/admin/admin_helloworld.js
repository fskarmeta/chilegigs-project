import { AdminNav } from "../../components/admin/navbar_admin";

export const HelloWorld = () => {
  return (
    <div className="col-md-12">
      <div className="row">
        <div
          className="col-md-1 border-right border-dark"
          style={{ height: "90vh" }}
        >
          <AdminNav />
        </div>
        <div classname="col-md-11">hola mundo</div>
      </div>
    </div>
  );
};
