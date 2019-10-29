import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  CardFooter,
  Button,
  Row,
  Input,
  Collapse,
  Table
} from "reactstrap";
import Popup from "reactjs-popup";
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
import Modifier from "./Affectation/ModifierAffec";
//Css
import "../../App.scss";
import "./admin.css";
/// redux
import getSujetsPl from "../../store/actions/getSujetPlanif";
import getSujetsArch from "../../store/actions/getSujetArch";
import deleteSP from "../../store/actions/deleteAction";
import update from "../../store/actions/updateAction";
import archive from "../../store/actions/archiveAction";
import { connect } from "react-redux";

const Sidebar = React.lazy(() => import("./Sidebar"));

const DefaultAdmin = React.lazy(() => import("./DefaultAdmin"));

class Admin extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  constructor(props) {
    super(props);

    this.handelChange = this.handelChange.bind(this);
    this.onEntering = this.onEntering.bind(this);
    this.onEntered = this.onEntered.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = {
      NewSujet: "",
      NewPresentateur: "",
      NewDate: "",
      presentateursId: 0,
      presentateurs: {},
      ArchId: 0,
      ArchAdded: false,
      sujetAdded: false,
      Sujet: "",
      Presentateur: "",
      Date: "",
      Lien: "",
      Lien2: ""
    };
  }
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    this.props.getSujetsPl();
    this.props.getSujetsArch();
  }
  onEntering() {
    this.setState({ status: 'Opening...' });
  }
  onEntered() {
    this.setState({ status: 'Opened' });
  }
  onExiting() {
    this.setState({ status: 'Closing...' });
  }

  onExited() {
    this.setState({ status: 'Closed' });
  }
  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }
   resetFields(){
    document.getElementById('Lien').value="";
    document.getElementById('Lien2').value=""
    }
  render() {
    let dataObj = this.props.data.SujetsPl,
      dataArr = [],
      archId = this.props.data.Sujetsarch.archId,
      auth = this.props.data.auth,
      isAuth = auth.isAuth;
    for (let pre in dataObj) {
      const name = dataObj[pre];

      name.Sujet && dataArr.push(name);
    }

    let presentateur = dataArr.map((pres, i) => {
      return (
        <tr key={i}>
          <td>{pres.Sujet}</td>
          <td>{pres.Presentateur}</td>
          <td>{pres.Date}</td>
          <td>
            <Button
              size="sm"
              color="primary"
              onClick={() => {
                this.props.deleteSP("Sujets_pr", pres.id);
              }}
            >
              <i
                className="icons d-block cui-trash"
                style={{ fontSize: "large" }}
                title="Supprimer"
              ></i>
            </Button>
            <Modifier
              update={(dbName, state, id) => {
                this.props.update("Sujets_pr", state, pres.id);
              }}
              clicked={() => pres}
            />

            <div
              className="animated fadeIn"
              onClick={this.clickHandler}
              style={{ display: "inline-block" }}
            >
              <div>
              <Popup
            modal
            trigger={
              <Button size="sm"
              color="primary" 
              title="Archiver">
                <i
                 className="icons d-block cui-layers"
                 style={{ fontSize: "large" }}
                 ></i>
              </Button>
            }
             >
                {close => (
              <div>
                <Button 
                onExiting={this.onExiting} onExited={this.onExited}
                 size="sm"
                 className="close"
                 onClick={close}
                 style={{ color: "red" }} >
                   <i class="fa fa-times-circle fa-lg  " /> 
                   
                    
                 </Button>
                 
                
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify" ></i> 
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <th>Ajouter un lien</th>
                     <th>  </th>
                      <tbody>
                        <tr>
                          <td>
                            <Input
                              id="Lien"
                              type="input"
                              name="Lien"
                              value={this.state.Lien}
                              onChange={this.handelChange} >
                            </Input>
                          </td>
                          <td>
                            <Button size="sm" color="primary" onClick={this.toggle} style={{ marginTop:"4px"}}>
                                <i class="fa fa-plus-circle fa-lg " />
                            </Button>
                          </td> 
                          </tr>
                          <Collapse isOpen={this.state.collapse} onEntering={this.onEntering} onEntered={this.onEntered} onExiting={this.onExiting} onExited={this.onExited}>
                                <CardBody>
                                  <Input type="input"
                                        id="Lien2"
                                        name="Lien2"
                                        value={this.state.Lien2}
                                        onChange={this.handelChange} />
                                </CardBody>
                          </Collapse>
                        <tr>
                      
                        <Button
                                      onExiting={this.onExiting} onExited={this.onExited}
                                      size="sm"
                                      color="primary"
                                      title="Enregistrer"
                                      onClick={e => {
                                        this.props.archive(
                                          e,
                                          "Sujets_arch",
                                          "Sujets_pr",
                                          pres.id,
                                          archId,
                                          pres.Sujet,
                                          pres.Presentateur,
                                          pres.Date,
                                          this.state.Lien,
                                          this.state.Lien2
                                        ); 
                                      } }
                                    >
                                      Enregistrer
                                      <Collapse  onExited={this.onExited} onExiting={this.onExiting} />
                                    </Button>
                                    
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            </div> )
            }
          </Popup>
              </div>
            </div>
          </td>
        </tr>
      );
    });
    if (isAuth === undefined || isAuth === false)
      return <Redirect to="/login" />;
    else
      return (
        <div className="app">
          <DefaultAdmin />

          {/******************************************* Menu **************************/}

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
          <div>
            <Col className="admin-column"
            style={
              {
                 paddingBottom: "78%"
              }
            }>
              <Card>
                <CardHeader></CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <th>Sujet</th>
                      <th>Présentateur</th>
                      <th>Date</th>
                      <th> </th>
                      <th></th>
                    </thead>
                    <tbody>{presentateur}</tbody>
                  </Table>
                </CardBody>
                <CardFooter></CardFooter>
              </Card>
            </Col>
          </div>
        </div>
      );
  }
}

const mapStateToProps = state => {
  return {
    data: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSujetsPl: () => dispatch(getSujetsPl()),
    getSujetsArch: () => dispatch(getSujetsArch()),
    deleteSP: (dbName, id) => dispatch(deleteSP(dbName, id)),
    update: (dbName, s, id) => {
      dispatch(update(dbName, s, id));
    },
    archive: (
      e,
      dbName,
      dbNameS,
      presentateurId,
      ArchId,
      Sujet,
      Presentateur,
      date,
      Lien,
      Lien2
    ) =>
      dispatch(
        archive(
          e,
          dbName,
          dbNameS,
          presentateurId,
          ArchId,
          Sujet,
          Presentateur,
          date,
          Lien,
          Lien2
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
