import React , {Component , Suspense} from 'react';
import { AppHeader, AppBreadcrumb2 as AppBreadcrumb, AppSidebarNav2 as AppSidebarNav,} from '@coreui/react';
import { Badge, Card, CardBody, CardHeader, Col, ListGroup, ListGroupItem, Row , Table} from 'reactstrap';

const HeaderAdmin = React.lazy(() => import('./HeaderAdmin'));

class gestionSujet extends Component{

    render(){
        return(
          <div className="animated fadeIn">

              <AppHeader fixed>
                  <Suspense  >
                     <HeaderAdmin />
                  </Suspense>
              </AppHeader>

            <Row>
            <Col xl={6}>
                <Card>
                <CardHeader>
                    <i className="fa fa-align-justify"></i> Users <small className="text-muted">example</small>
                </CardHeader>
                <CardBody>
                    <Table responsive hover>
                    <thead>
                        <tr>
                        <th scope="col">id</th>
                        <th scope="col">Sujet</th>
                        <th scope="col">Presentateur</th>
                        <th scope="col">Date</th>
                        <th scope="col">Afectation</th>
                        <th scope="col">Suppression</th>
                        <th scope="col">l'Ajout</th>
                        </tr>
                    </thead>
                    <tbody>
                   {/* <tr key={user.id.toString()}>
                            <th scope="row"><Link to={userLink}>{user.id}</Link></th>
                            <td><Link to={userLink}>{user.name}</Link></td>
                            <td>{user.registered}</td>
                            <td>{user.role}</td>
                            <td><Link to={userLink}><Badge color={getBadge(user.status)}>{user.status}</Badge></Link></td>
        </tr>*/}
                    </tbody>
                    </Table>
                </CardBody>
                </Card>
            </Col>
         </Row>
      </div>
        );
    }
}

export default gestionSujet;