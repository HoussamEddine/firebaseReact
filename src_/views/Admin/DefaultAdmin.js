import React,{Component ,Suspense} from 'react';
import {
   
    AppHeader,
    AppBreadcrumb2 as AppBreadcrumb,
    AppSidebarNav2 as AppSidebarNav,
  } from '@coreui/react';
import * as router from 'react-router-dom';
import { Redirect, Route, Switch } from 'react-router-dom';
import { Container } from 'reactstrap';

import routes from '../../routes';
  
import Sidebar from './Sidebar';

const HeaderAdmin = React.lazy(() => import('./HeaderAdmin'));
//const Sidebar =React.lazy(() => import('./Sidebar'));

class DefaultAdmin extends Component{
constructor(props){
    super(props);
}

    render(){
        return(
            <div>
             <AppHeader fixed>
                  <Suspense  >
                     <HeaderAdmin />
                 </Suspense>
              </AppHeader>
              
             
            </div>
        );
    }

}
export default DefaultAdmin;