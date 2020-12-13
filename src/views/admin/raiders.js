import CategoryEditForm from "../../components/admin/CategoryEdit";
import { AdminNav } from "../../components/admin/navbar_admin";
export const Raider = () => {
  return (
    <div className="container-fluid">
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
