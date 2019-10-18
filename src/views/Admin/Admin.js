import React, { Component, Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";

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
  Row,
  Input
} from "reactstrap";

import { Table } from "reactstrap";
import "../../App.scss";

import "./admin.css";
/// redux
import getSujetsPl from "../../store/actions/sujetsPl";
import getSujetsArch from "../../store/actions/sujetsarch";
import { connect } from "react-redux";

// api

import deleteElem from "./../../api/delete";
import update from "./../../api/update";
import archive from "./../../api/archive";

const Sidebar = React.lazy(() => import("./Sidebar"));

const DefaultAdmin = React.lazy(() => import("./DefaultAdmin"));

class Admin extends Component {
  loading = () => (
    <div className="animated fadeIn pt-1 text-center">Loading...</div>
  );

  constructor(props) {
    super(props);
    // this.update = this.update.bind(this);
    // this.Archi = this.Archi.bind(this);
    this.handelChange = this.handelChange.bind(this);
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
      Lien: ""
    };
  }
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentWillMount() {
    this.props.getSujetsPl();
    // const ref = firebase.database().ref("Sujets_pr");
    // ref.on("value", snapshot => {
    //   let value = snapshot.val(),
    //     presentateurId;
    //   if (value.length) {
    //     presentateurId = value.length - 1;
    //   } else {
    //     for (let id in value) {
    //       presentateurId = id;
    //     }
    //   }
    //   this.setState({
    //     presentateurs: snapshot.val(),
    //     presentateurId: presentateurId
    //   });
    // });
    // const refAr = firebase.database().ref("Sujets_arch");
    // refAr.on("value", snapshot => {
    //   let value = snapshot.val(),
    //     ArchId;
    //   if (value.length) {
    //     ArchId = value.length - 1;
    //   } else {
    //     for (let id in value) {
    //       ArchId = id;
    //     }
    //   }
    //   this.setState({
    //     archiver: snapshot.val(),
    //     ArchId: ArchId
    //   });
    // });
    this.props.getSujetsArch();
  }
  // delete(e, presentateurId, pArr) {
  //   if (pArr.length === 1) {
  //     this.setState({
  //       message: "Vous ne pouvez pas supprimer la dérnière ligne"
  //     });
  //     return;
  //   }
  //   const ref = firebase.database().ref("Sujets_pr");
  //   ref.child(presentateurId).remove();
  // }

  // Archi(e, presentateurId, pArr, Sujet, Presentateur, Date) {
  //   //**************** */add
  //   e.preventDefault();

  // firebase
  //   .database()
  //   .ref("Sujets_arch/" + ++this.state.ArchId)
  //   .set({
  //     id: this.state.ArchId,
  //     Sujet: Sujet,
  //     Presentateur: Presentateur,
  //     Date: Date,
  //     Lien: this.state.Lien
  //     // lien: this.Lien,
  //   })
  //   .then(u => {
  //     this.setState({
  //       sujetAdded: true,
  //       message: "Ajouté avec succès"
  //     });
  //   })
  //   .catch(e => {
  //     this.setState({
  //       sujetAdded: false,
  //       message: "Erreur"
  //     });
  //   });

  //*****************delete */
  // if (pArr.length === 1) {
  //   this.setState({
  //     message: "Vous ne pouvez pas supprimer la dérnière ligne"
  //   });
  //   return;
  // }
  // const refa = firebase.database().ref("Sujets_pr");
  // refa.child(presentateurId).remove();
  // }

  // update = (e, s, presentateurId) => {
  //   let presentateurUp = {
  //     Sujet: s.NewSujet,
  //     Presentateur: s.NewPresentateur,
  //     Date: s.NewDate
  //   };

  //   const ref = firebase.database().ref("Sujets_pr");
  //   ref.child(presentateurId).update(presentateurUp);
  // }

  render() {
    let dataObj = this.props.data.SujetsPl,
      dataArr = [],
      archId = this.props.data.Sujetsarch.archId;
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
                deleteElem("Sujets_pr", pres.id);
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
                update("Sujets_pr", state, pres.id);
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
                    <Button size="sm" color="primary" title="Archiver">
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
                                      ></Input>
                                    </td>
                                  </tr>
                                  <tr>
                                    <Button
                                      size="sm"
                                      color="primary"
                                      title="Enregistrer"
                                      onClick={e => {
                                        archive(
                                          "Sujets_arch",
                                          e,
                                          pres.id,
                                          archId,

                                          pres.Sujet,
                                          pres.Presentateur,
                                          pres.Date,
                                          this.state.Lien
                                        );
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
                    </div>
                  )}
                </Popup>
              </div>
            </div>
          </td>
        </tr>
      );
    });
    if (this.props.isAuth === false) return <Redirect to="/login" />;
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
            <Col className="admin-column">
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
    getSujetsArch: () => dispatch(getSujetsArch())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
