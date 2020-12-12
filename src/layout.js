import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import ScrollToTop from "./components/scrollToTop";
import { Navbar } from "./components/navbar";
import { HelloWorld } from "./views/admin/admin_helloworld";
import { Raider } from "./views/admin/raiders";
import { AdminHome } from "./views/admin/home";
import { AdminNav } from "./components/admin/navbar_admin";
import { EditarPerfil } from "./views/dj/editar_perfil";
import { EditarPerfilCliente } from "./views/cliente/editar_perfil";
import { DjProfile } from "./views/dj/perfil";
import Home from "./views/home/home";
import NuevaClave from "./views/general/clave";
import Spinner from "./components/home/spinner";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  // simulacro de autentificación

  return (
    <div className="d-flex flex-column">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/profile">
              <span>No puede existir un perfil vacío</span>
              <Spinner />
            </Route>
            <Route exact path="/profile/:username">
              <DjProfile />
            </Route>
            <Route exact path="/dj/edit">
              <EditarPerfil />
            </Route>
            <Route exact path="/client/edit">
              <EditarPerfilCliente />
            </Route>
            <Route exact path="/recover/:token">
              <NuevaClave />
            </Route>
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
            <Route>
              <h1>No existe esta ruta</h1>
            </Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
