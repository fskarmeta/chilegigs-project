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
import { ClientProfile } from "./views/cliente/perfil";
import Home from "./views/home/home";
import NuevaClave from "./views/general/clave";
import Spinner from "./components/home/spinner";

const Layout = () => {
  const basename = process.env.BASENAME || "";

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
            <Route exact path="/admin">
              <HelloWorld />
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
            <Route exact path="/admin/home">
              <AdminHome />
            </Route>
            <Route exact path="/admin/raider">
              <Raider />
            </Route>
            <Route exact path="/dj/profile/:username">
              <DjProfile />
            </Route>
            <Route exact path="/client/profile/:username">
              <ClientProfile />
            </Route>
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
