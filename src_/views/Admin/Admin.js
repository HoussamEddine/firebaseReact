import React, { Component, Suspense } from "react";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/logo.jpg";
import sygnet from "../../assets/img/brand/sygnet.jpg";
import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
import { Container } from "reactstrap";
import routes from "../../routes";
import Popup from "reactjs-popup";
import firebase from "../../config/config";

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
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  CardFooter,
  Button,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";

import { Link } from "react-router-dom";

import { FormGroup, Input } from "reactstrap";
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
    this.state = {
      NewSujet: "",
      NewPresentateur: "",
      NewDate: "",
      presentateursId: 0,
      presentateurs: {}
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
              color="danger"
              onClick={e => {
                this.delete(e, pres.id, presentateursArr);
              }}
            >
              <i
                className="icons d-block cui-trash"
                style={{ fontSize: "large" }}
              ></i>
            </Button>
            <Modifier
              update={(e, state) => {
                this.update(e, state, pres.id);
              }}
              clicked={() => pres}
            />
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
                  // paddingBottom: "8%"
                }
              }
            >
              <Card>
                <CardHeader>
                  <strong>Sujet</strong>
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
