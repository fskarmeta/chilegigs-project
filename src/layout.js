import { BrowserRouter, Route, Switch } from "react-router-dom";
import injectContext from "./store/appContext";
import ScrollToTop from "./components/scrollToTop";
import { Navbar } from "./components/navbar";
import { HelloWorld } from "./views/admin/admin_helloworld";

const Layout = () => {
  const basename = process.env.BASENAME || "";

  return (
    <div className="d-flex flex-column">
      <BrowserRouter basename={basename}>
        <ScrollToTop>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <h1>Not found!</h1>
            </Route>
            <Route exact path="/admin">
              <HelloWorld />
            </Route>
          </Switch>
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
