import React, { Component , Suspense} from 'react'; 
import * as router from 'react-router-dom';
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav,
} from '@coreui/react';

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