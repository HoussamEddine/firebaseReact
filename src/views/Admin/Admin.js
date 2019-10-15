import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import firebase from "../../config/config";
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

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  CardFooter,
  Button,
  Row ,
  Input
} from "reactstrap";

import { Table } from "reactstrap";
import "../../App.scss";

import "./admin.css";
// import * as firebase from "firebase";

//const HeaderAdmin = React.lazy(() => import('./HeaderAdmin'));
const Sidebar = React.lazy(() => import("./Sidebar"));

const DefaultAdmin = React.lazy(() => import("./DefaultAdmin"));

class Admin extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  constructor(props) {
    super(props);
    this.update = this.update.bind(this);
    this.Archi=this.Archi.bind(this);
    this.handelChange = this.handelChange.bind(this);
    this.state = {
      NewSujet: "",
      NewPresentateur: "",
      NewDate: "",
      presentateursId: 0,
      presentateurs: {},
      ArchId: 0,
      ArchAdded: false,
      sujetAdded:false,
      Sujet:"",
      Presentateur:"",
      Date:"",
      Lien :""

    };
  }
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    const ref = firebase.database().ref("Sujets_pr");
    ref.on("value", snapshot => {
      let value = snapshot.val(),
        presentateurId;
      if (value.length) {
        presentateurId = value.length - 1;
      } else {
        for (let id in value) {
          presentateurId = id;
        }
      }
      this.setState({
        presentateurs: snapshot.val(),
        presentateurId: presentateurId
      });
    });
    const refAr = firebase.database().ref("Sujets_arch");
    refAr.on("value", snapshot => {
      let value = snapshot.val(),
      ArchId;
      if (value.length) {
        ArchId = value.length - 1;
      } else {
        for (let id in value) {
          ArchId = id;
        }
      }
      this.setState({
        archiver: snapshot.val(),
        ArchId: ArchId
      });
    });

  }
  delete(e, presentateurId, pArr) {
    if (pArr.length === 1) {
      this.setState({
        message: "Vous ne pouvez pas supprimer la dérnière ligne"
      });
      return;
    }
    const ref = firebase.database().ref("Sujets_pr");
    ref.child(presentateurId).remove();
  }

  Archi(e, presentateurId, pArr, Sujet, Presentateur, Date){
   
    //**************** */add
    e.preventDefault();

    firebase.database().ref("Sujets_arch/" + ++this.state.ArchId).set({
        id: this.state.ArchId,
        Sujet: Sujet,
        Presentateur:Presentateur,
        Date: Date,
        Lien :this.state.Lien
       // lien: this.Lien,

      })
      .then(u => {
        this.setState({
          sujetAdded: true,
          message: "Ajouté avec succès"
        });
      })
      .catch(e => {
        this.setState({
          sujetAdded: false,
          message: "Erreur"
        });
      });

   //*****************delete */
   if (pArr.length === 1) {
    this.setState({
      message: "Vous ne pouvez pas supprimer la dérnière ligne"
    });
    return;
  }
  const refa = firebase.database().ref("Sujets_pr");
  refa.child(presentateurId).remove();

  }

  update = (e, s, presentateurId) => {
    let presentateurUp = {
      Sujet: s.NewSujet,
      Presentateur: s.NewPresentateur,
      Date: s.NewDate
    };

    const ref = firebase.database().ref("Sujets_pr");
    ref.child(presentateurId).update(presentateurUp);
  };

  render() {
    let presentateursObj = this.state.presentateurs,
      presentateursArr = [];
    for (let pre in presentateursObj) {
      const name = presentateursObj[pre];
      presentateursArr.push(name);
    }

    let presentateur = presentateursArr.map((pres, i) => {
      return (
        <tr key={i}>
          <td>{pres.Sujet}</td>
          <td>{pres.Presentateur}</td>
          <td>{pres.Date}</td>
          <td>
            <Button
              size="sm"
              color="primary"
              onClick={e => {this.delete(e, pres.id, presentateursArr);
              }}
            >
              <i
                className="icons d-block cui-trash"
                style={{ fontSize: "large" }} title="Supprimer"
              ></i>
            </Button>
            <Modifier
              update={(e, state) => {
                this.update(e, state, pres.id);
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
                <a
                  className="close"
                  onClick={close}
                  style={{ cursor: "pointer" }}
                >
                  &times;
                </a>
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> 
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <th>Ajouter un lien</th>
                     
                      <tbody>
                        <tr>
                          <td>
                            <Input
                              type="input"
                             
                              name="Lien"
                              value={this.state.Lien}
                              onChange={this.handelChange}
                            >
                              
                            </Input>
                          </td>
                                               
                        </tr>
                        <tr>
                        <Button
                            size="sm"
                            color="primary" 
                            title="Enregistrer"
                            onClick={e => {this.Archi(e, pres.id, presentateursArr ,pres.Sujet,
                                                      pres.Presentateur,pres.Date);
                            }}
                            >
                            Enregistrer
                            
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
    if (!this.props.isAuth) return <Redirect to="/login" />;
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
            <Col
              className="admin-column"
              style={
                {
                  // width: "80%",
                  // marginLeft: "18%",
                   paddingBottom: "78%"
                }
              }
            >
              <Card>
                <CardHeader>
                  
                </CardHeader>
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

export default Admin;
