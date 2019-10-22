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
    this.props.getSujetsArch();
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
                                        this.props.archive(
                                          e,
                                          "Sujets_arch",
                                          "Sujets_pr",
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
      Lien
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
          Lien
        )
      )
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);
