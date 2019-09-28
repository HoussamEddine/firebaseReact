import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
//import firebase from "./config/config";
import Admin from "./views/Admin/Admin";
import AjoutSujet from "./views/Admin/Sujet";
import AjoutPresentateur from "./views/Admin/Presentateurs";
// import ModifierPresentateur from "./views/Admin/Presentateurs/ModifierPresentateur";

/*import PrivateRoute from "./PrivateRoute";
import { renderRoutes } from "react-router-config";
import { any } from "prop-types";
*/

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
const Register = React.lazy(() => import("./views/Pages/Register"));
const Page404 = React.lazy(() => import("./views/Pages/Page404"));
const Page500 = React.lazy(() => import("./views/Pages/Page500"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isMounted: false,
      user: {}
    };
  }

  /* componentWillUnmount() {
    this.setState({ isMounted: false });
  }*/

  render() {
    console.log("user", this.state.user);

    return (
      <div className="App">
        <HashRouter>
          <React.Suspense fallback={loading()}>
            {/* {this.state.user ? <Admin /> : <Login />} */}
            <Switch>
              <Route
                exact
                path="/Login"
                name="Login Page"
                render={props => <Login {...props} />}
              />
              <Route
                exact
                path="/Admin"
                name="Admin Page"
                render={props => <Admin {...props} />}
              />

              <Route
                exact
                path="/sujet"
                name="Ajout Page"
                render={props => <AjoutSujet {...props} />}
              />
              {/* <Route
                exact
                path="/Modifier"
                name="Modifier Page"
                render={props => <ModifierPresentateur {...props} />}
              /> */}
              <Route
                exact
                path="/presentateurs"
                name="Ajout Page"
                render={props => <AjoutPresentateur {...props} />}
              />

              <Route
                path="/"
                name="Home"
                render={props => <DefaultLayout {...props} />}
              />
            </Switch>
          </React.Suspense>
        </HashRouter>
      </div>
    );
  }
}

/*export default withFirebaseAuth({
  providers,firebaseAppAuth,})(App);*/
export default App;
