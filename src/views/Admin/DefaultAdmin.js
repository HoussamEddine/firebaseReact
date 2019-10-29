import React, { Component, Suspense } from "react";
import { AppHeader } from "@coreui/react";
import { connect } from "react-redux";
import firebase from "../../config/config";
import logout from "./../../store/actions/logoutAction";

const HeaderAdmin = React.lazy(() => import("./HeaderAdmin"));

class DefaultAdmin extends Component {
  constructor(props) {
    super(props);
  }
  logout(e) {
    e.preventDefault();
    firebase.auth().signOut();
    this.props.dispatch(logout(e));
    // this.props.history.push("/SujetPl");
  }
  render() {
    return (
      <div>
        <AppHeader fixed>
          <Suspense>
            <HeaderAdmin onLogout={e => this.logout(e)} />
          </Suspense>
        </AppHeader>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};
export default connect(
  null,
  mapDispatchToProps
)(DefaultAdmin);
