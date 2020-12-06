import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import ScrollToTop from "./components/scrollToTop";
import { Navbar } from "./components/navbar";
import { HelloWorld } from "./views/admin/admin_helloworld";
import { Raider } from "./views/admin/raiders";
import { AdminHome } from "./views/admin/home";
import { AdminNav } from "./components/admin/navbar_admin";
import { EditarPerfil } from "./views/dj/editar_perfil";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  // simulacro de autentificación
  const admin = true;
  return (
    <div className="d-flex flex-column">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <h1>Not found!</h1>
            </Route>
            <Route exact path="/editprofile">
              <EditarPerfil />
            </Route>
            {admin ? (
              <div className="row">
                <div className="col-md-1">
                  <AdminNav />
                </div>
                <div className="col-md-11">
                  <Route exact path="/admin">
                    <HelloWorld />
                  </Route>
                  <Route exact path="/admin/raider">
                    <Raider />
                  </Route>
                  <Route exact path="/admin/home">
                    <AdminHome />
                  </Route>
                </div>
              </div>
            ) : (
              <h1>Ingreso prohibido</h1>
            )}
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
