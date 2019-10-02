import React, { Component } from 'react';
import { Link, NavLink ,Route } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';
import PropTypes from 'prop-types';
import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.jpg'
import sygnet from '../../assets/img/brand/sygnet.jpg'

import fire from '../../config/config';
import Login from '../../views/Pages/Login/Login'

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

class DefaultHeader extends Component {


  logout() {
if( fire.auth().signOut()) 
   
{
  alert("Déconnecter")
   this.props.history.push('/Login')
}
    
}

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

       {/* <Nav className="d-md-down-none" navbar>
          <NavItem className="px-3">
            <NavLink to="/dashboard" className="nav-link" >Dashboard</NavLink>
          </NavItem> 
          <NavItem className="px-3">
            <Link to="/users" className="nav-link">Sujets programmés</Link>
          </NavItem>
        <NavItem className="px-3">
            <NavLink to="#" className="nav-link">Settings</NavLink>
          </NavItem> 
        </Nav>*/}  
        <Nav className="ml-auto" navbar>
         
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
             
              
              <DropdownItem onClick={e => this.props.onLogin(e)}><i className="fa fa-lock"></i> Login</DropdownItem>
              <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> Logout</DropdownItem>
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