import React, { Component , Suspense} from 'react'; 
import fire from '../../config/config';

import { Link, NavLink ,Route } from 'react-router-dom';
import { Badge, UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav, NavItem } from 'reactstrap';

import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.jpg'
import sygnet from '../../assets/img/brand/sygnet.jpg'
import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

//import users from'../Users/Users';

class HeaderAdmin extends Component {
  constructor(props){
      super(props);
      this.logout = this.logout.bind(this);
  }

  logout(){

    fire.auth().signOut().then(function() {
      // Sign-out successful.
    }).catch(function(error) {
      // An error happened.
    });
}



render(){
    return(

        
        <AppHeader fixed>
        <Suspense  >
        <React.Fragment>
        <AppSidebarToggler className="d-lg-none" display="md" mobile />
        <AppNavbarBrand
          full={{ src: logo, width: 100, height: 40, alt: 'Novelis Logo' }}
          minimized={{ src: sygnet, width: 30, height: 30, alt: 'Novelis Logo' }}
        />
        <AppSidebarToggler className="d-md-down-none" display="lg" />

      
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
             
              
            <DropdownItem onClick={this.logout}><i className="fa fa-lock"></i> <Link to="#"> Logout </Link></DropdownItem>
           
             
            </DropdownMenu>
          </UncontrolledDropdown>
        </Nav>
       {/** <AppAsideToggler className="d-md-down-none" /> menu droit */} 
        {/*<AppAsideToggler className="d-lg-none" mobile />*/}
      </React.Fragment>
      </Suspense>
      </AppHeader>
    );
}

}

export default HeaderAdmin;