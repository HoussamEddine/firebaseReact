import React, { Component } from 'react'; 

import { Link} from 'react-router-dom';
import {  UncontrolledDropdown, DropdownItem, DropdownMenu, DropdownToggle, Nav } from 'reactstrap';

import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.jpg'
import sygnet from '../../assets/img/brand/sygnet.jpg'


class HeaderAdmin extends Component {
  constructor(props){
      super(props);
     // this.logout = this.logout.bind(this);
  }


render(){
  
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