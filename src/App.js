import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import "./App.scss";
import firebase from "./config/config";
import PrivateRoute from "./PrivateRoute";
import Users from "./views/Users/Users";
import Admin from "./views/Admin/Admin";

import { any } from "prop-types";

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
      isMounted: false
      // user: {}
    };
  }
  componentDidMount() {
    this.setState({
      isMounted: true
    });
    // this.authentification();
  }
  // authentification() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (this.state.isMounted) {
  //       if (user) {
  //         this.setState({ user });
  //       } else {
  //         this.setState({ user: null });
  //       }
  //     }
  //   });
  // }
  // componentWillUnmount() {
  //   this.setState({ isMounted: false });
  // }

  render() {
    const isUser = this.state.user;
    return (
      <div className="App">
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/login"
                name="Login Page"
                render={props => <Login {...props} />}
              />
              <Route
                exact
                path="/register"
                name="Register Page"
                render={props => <Register {...props} />}
              />
              <Route
                exact
                path="/404"
                name="Page 404"
                render={props => <Page404 {...props} />}
              />
              <Route
                exact
                path="/500"
                name="Page 500"
                render={props => <Page500 {...props} />}
              />
              <Route
                exact
                path="/admin"
                name="admin"
                render={props => <Admin {...props} />}
              />
              <Route
                path="/"
                name="Home"
                render={props => <DefaultLayout {...props} />}
              />
            </Switch>
            }
          </React.Suspense>
        </HashRouter>
      </div>
    );
  }
}

/*export default withFirebaseAuth({
  providers,firebaseAppAuth,})(App);*/
export default App;
