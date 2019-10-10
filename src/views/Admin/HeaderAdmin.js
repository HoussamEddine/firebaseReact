import React, { Component , Suspense} from 'react'; 
import fire from '../../config/config';

import { Redirect} from "react-router-dom";
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
import SujetPl from '../Sujet_pl/SujetPl';


class HeaderAdmin extends Component {
  constructor(props){
      super(props);
     // this.logout = this.logout.bind(this);
  }

 



render(){
  
  //const isAuth = this.props.isAuth;

    return(
      
     <React.Fragment>
     <AppSidebarToggler className="d-lg-none" display="md" mobile />
     <AppNavbarBrand
       full={{ src: logo, width: 100, height: 40, alt: 'Novelis Logo' }}
       minimized={{ src: sygnet, width: 30, height: 30, alt: 'Novelis Logo' }}
     />
     <AppSidebarToggler className="d-md-down-none" display="lg" />

     
     <Nav className="ml-auto" navbar>
     <UncontrolledDropdown nav direction="down">
          <DropdownToggle nav>
           <img src={'../../assets/img/avatars/admin1.jpg'} className="img-avatar" />
         </DropdownToggle> 
        <DropdownMenu right>
        <DropdownItem 
                onClick={e => this.props.onLogout(e)} 
               /**style={isAuth ? { display: "block" } : { display: "none" }} */ 
               to="SujetPl">               
                <Link to="SujetPl"  ><i className="fa fa-lock"></i> Logout</Link>
              </DropdownItem>
          
         </DropdownMenu>
       </UncontrolledDropdown>
     </Nav>
   </React.Fragment>

    );
}

}

export default HeaderAdmin;