import React, { Component , Suspense} from 'react'; 
import {  AppNavbarBrand, AppSidebarToggler } from '@coreui/react';
import logo from '../../assets/img/brand/logo.jpg'
import sygnet from '../../assets/img/brand/sygnet.jpg'
import * as router from 'react-router-dom';
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

import { HashRouter, Route, Switch } from "react-router-dom";
import Navi from './Navi';

class Sidebar extends  Component{
    render(){
        return(

            <div className="app-body">
          <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
                    <Suspense>
                           {/** <Route exact path="/Navi" name="Ajout Page" render={props => <Navi {...props}/>}/>
                            <AppSidebarNav/>*/}   
                            <AppSidebarNav navConfig={Navi} {...this.props} router={router}/> 
                     </Suspense>
               <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
            </div>
        );
    }
}

export  default Sidebar;