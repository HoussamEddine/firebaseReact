import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import "./App.scss";
import firebase from "./config/config";
import "firebase/auth";
import Admin from "./views/Admin/Admin";
import AjoutSujet from "./views/Admin/Sujet";
import AjoutPresentateur from "./views/Admin/Presentateurs";
import Affectation from "./views/Admin/Affectation/index";
import SujetArchiv from './views/Sujet_arch/SujetArch';

const loading = () => (
  <div className="animated fadeIn pt-3 text-center">Loading...</div>
);

// Containers
const DefaultLayout = React.lazy(() => import("./containers/DefaultLayout"));

// Pages
const Login = React.lazy(() => import("./views/Pages/Login"));
//const Register = React.lazy(() => import("./views/Pages/Register"));

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isAuth: null
    };
  }
  componentDidMount() {
    this.listener = firebase.auth().onAuthStateChanged(isAuth => {
      isAuth ? this.setState({ isAuth }) : this.setState({ isAuth: null });
    });
  }
  componentWillUnmount() {
    firebase.auth().signOut();
    console.log("unmount");

    this.listener();
  }

  render() {
    return (
      <div className="App">
        <HashRouter>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route
                exact
                path="/Login"
                name="Login Page"
                render={props => (
                  <Login {...props} isAuth={this.state.isAuth} />
                )}
              />
              <Route
                exact
                path="/Admin"
                name="Admin Page"
                render={props => (
                  <Admin {...props} isAuth={this.state.isAuth} />
                )}
              />
             
              <Route
                exact
                path="/Sujet"
                name="Ajout Page"
                render={props => <AjoutSujet {...props} isAuth={this.state.isAuth}/>}
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
                render={props => <AjoutPresentateur {...props} isAuth={this.state.isAuth} />}
              />

              <Route
                exact
                path="/Affec"
                name="Affectation Page"
                render={props => (
                  <Affectation {...props} isAuth={this.state.isAuth} />
                )}
              />
              <Route
                path="/"
                name="Home"
                render={props => (
                  <DefaultLayout {...props} isAuth={this.state.isAuth} />
                )}
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
