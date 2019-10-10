import React,{Component ,Suspense} from 'react';

import { Redirect, Route, Switch } from "react-router-dom";
import {
   
    AppHeader,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
  } from '@coreui/react';
import firebase from 'firebase';

const HeaderAdmin = React.lazy(() => import('./HeaderAdmin'));
//const Sidebar =React.lazy(() => import('./Sidebar'));

class DefaultAdmin extends Component{
constructor(props){
    super(props);
}
logout(e) {
    e.preventDefault();
    firebase.auth().signOut();    
   // this.props.history.push("/SujetPl");
  }
    render(){
        const isAuth = this.props.isAuth;
        return(
            <div>
             <AppHeader fixed>
                  <Suspense  >
                     <HeaderAdmin
                      onLogout={e => this.logout(e)}
                   isAuth={isAuth} />
                 </Suspense>
              </AppHeader>
              
             
            </div>
        );
    }

}
export default DefaultAdmin;