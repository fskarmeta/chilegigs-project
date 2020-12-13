import HomeEditForm from "../../components/admin/HomeEdit";
import { AdminNav } from "../../components/admin/navbar_admin";
export const AdminHome = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-1">
          <AdminNav />
        </div>
        <div className="col-md-11">
          <HomeEditForm />
        </div>
      </div>
    </div>
  );
};
