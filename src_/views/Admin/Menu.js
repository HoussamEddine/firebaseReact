import React,{Component ,Suspense} from 'react';
import {
    AppSidebar,
    AppSidebarFooter,
    AppSidebarForm,
    AppSidebarHeader,
    AppSidebarMinimizer,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav
  } from "@coreui/react";
  import Navi from "./Navi";
  import * as router from "react-router-dom";

class Menu extends Component{
    constructor(){
        super();
       
    }
   render()
   {
        return(
            <div className="app-body">
            <AppSidebar fixed display="lg">
              <AppSidebarHeader />
              <AppSidebarForm />
              <Suspense>
                <AppSidebarNav
                  navConfig={Navi}
                  {...this.props}
                  router={router}
                />
              </Suspense>
              <AppSidebarFooter />
              <AppSidebarMinimizer />
            </AppSidebar>
          </div>
        );}
        
}
export default Menu;