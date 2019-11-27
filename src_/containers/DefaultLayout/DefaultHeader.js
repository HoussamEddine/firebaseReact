import React, { Component } from "react";
import {
  UncontrolledDropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav
} from "reactstrap";
import PropTypes from "prop-types";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/logo.jpg";
import sygnet from "../../assets/img/brand/sygnet.jpg";
import { connect } from "react-redux";

const propTypes = {
  children: PropTypes.node
};
const defaultProps = {};

class DefaultHeader extends Component {
 
  render() {
    const { children, ...attributes } = this.props;
    const isAuth = this.props.data.auth.isAuth;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 100, height: 40, alt: "Novelis Logo" }}
          minimized={{
            src: sygnet,
            width: 30,
            height: 30,
            alt: "Novelis Logo"
          }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="ml-auto" navbar>
          <UncontrolledDropdown nav direction="down">
            <DropdownToggle nav>
              <img
                src={"../../assets/img/avatars/admin1.jpg"}
                className="img-avatar"
                alt="admin@bootstrapmaster.com"
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem
                onClick={e => this.props.onLogin(e)}
                style={isAuth ? { display: "none" } : { display: "block" }}
              >
                <i className="fa fa-lock"></i> Login
              </DropdownItem>
              <DropdownItem
                onClick={e => this.props.onLogout(e)}
                style={isAuth ? { display: "block" } : { display: "none" }}
              >
                <i className="fa fa-lock"></i> Logout
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
      </React.Fragment>
    );
  }
}
DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;
const mapStateToProps = state => {
  return {
    data: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DefaultHeader);
