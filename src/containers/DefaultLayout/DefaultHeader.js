import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';

import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.jpg'
import sygnet from '../../assets/img/brand/sygnet.jpg'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {
  render() {

    // eslint-disable-next-line
    const { children, ...attributes } = this.props;

    return (
      <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 100, height: 40, alt: 'Novelis Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Novelis Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

        <Nav className="d-md-down-none" navbar>
         {/* <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem> */} 
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Sujets programmés</Link>
          </NavItem>
        {/**<NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem> */}  
        </Nav>
        <Nav className="ml-auto" navbar>
          <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-bell"></i><Badge pill color="danger">6</Badge></NavLink>
          </NavItem>
         {/**  <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-list"></i></NavLink>
          </NavItem>
         <NavItem className="d-md-down-none">
            <NavLink to="#" className="nav-link"><i className="icon-location-pin"></i></NavLink>
          </NavItem>*/} 
          <UncontrolledDropdown nav direction="down">
             <DropdownToggle nav>
              <img src={'../../assets/img/avatars/admin1.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
            </DropdownToggle> 
            <DropdownMenu right>
             {/* <DropdownItem header tag="div" className="text-center"><strong>Account</strong></DropdownItem>
              <DropdownItem><i className="fa fa-bell-o"></i> Updates<Badge color="info">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-envelope-o"></i> Messages<Badge color="success">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-tasks"></i> Tasks<Badge color="danger">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-comments"></i> Comments<Badge color="warning">42</Badge></DropdownItem>
             <DropdownItem header tag="div" className="text-center"><strong>Settings</strong></DropdownItem>
              <DropdownItem><i className="fa fa-user"></i> Profile</DropdownItem>
              <DropdownItem><i className="fa fa-wrench"></i> Settings</DropdownItem>
              <DropdownItem><i className="fa fa-usd"></i> Payments<Badge color="secondary">42</Badge></DropdownItem>
              <DropdownItem><i className="fa fa-file"></i> Projects<Badge color="primary">42</Badge></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><i className="fa fa-shield"></i> Lock Account</DropdownItem>*/}
              <DropdownItem onClick={e => this.props.onLogin(e)}><i className="fa fa-lock"></i> Login</DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
       {/** <AppAsideToggler className="d-md-down-none" /> menu droit */} 
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
    );
  }
}

DefaultHeader.propTypes = propTypes;
DefaultHeader.defaultProps = defaultProps;

export default DefaultHeader;
