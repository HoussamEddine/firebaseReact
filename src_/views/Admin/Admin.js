import React, { Component, Suspense } from "react";
import { AppNavbarBrand, AppSidebarToggler } from "@coreui/react";
import logo from "../../assets/img/brand/logo.jpg";
import sygnet from "../../assets/img/brand/sygnet.jpg";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import Navi from "./Navi";

import {
  Badge,
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Row
} from "reactstrap";

import { Link } from "react-router-dom";

import { FormGroup, Input } from "reactstrap";
import { Table } from "reactstrap";
import "../../App.scss";
import * as firebase from "firebase";
import fire from "../../config/config";

import * as router from "react-router-dom";

//const HeaderAdmin = React.lazy(() => import('./HeaderAdmin'));
const Sidebar = React.lazy(() => import("./Sidebar"));

const DefaultAdmin = React.lazy(() => import("./DefaultAdmin"));

class Admin extends Component {
  constructor(props) {
    super(props);

    // firebase.initializeApp(fire);
    this.state = {
      sujet_propose: []
    };
    //this.toggle = this.toggle.bind(this);
    /* this.state = {
      dropdownOpen: new Array(19).fill(false),
    };*/
  }

  /* constructor(props){
    super(props);
    //firebase.initializeApp(fire);
    this.state = {
      sujet_propose : []
    }*/

  componentWillMount() {
    const ref = firebase.database().ref("Sujets");
    ref.on("value", snapshot => {
      this.setState({
        sujet_propose: snapshot.val()
      });
    });
  }

  /*  toggle =(i) =>{
      const newArray = this.state.dropdownOpen.map((element, index) => { return (index === i ? !element : false); });
      this.setState({
        dropdownOpen: newArray,
      });
    }*/

  render() {
    let sujetsObj = this.state.sujet_propose;
    // const Id = Object.keys(sujetsObj).map((id, i) => {
    //   return (
    //     <tr key={i}>
    //       <td>{id}</td>
    //     </tr>
    //   );
    // });
    let sujetsArr = [];
    for (let suj in sujetsObj) {
      const name = sujetsObj[suj].Name;
      sujetsArr.push(name);
    }

    const sujets = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td>{sujets}</td>
        </tr>
      );
    });

    return (
      <div className="app">
        <DefaultAdmin />

        {/******************************************* Menu **************************/}

        <div className="app-body">
          <AppSidebar fixed display="lg">
            <AppSidebarHeader />
            <AppSidebarForm />
            <Suspense>
              <AppSidebarNav navConfig={Navi} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
        </div>

        {/******************************************* Content **************************/}

        <Row
          style={{
            margin: "25vh auto 25vh auto",
            width: "50%"
          }}
        >
          <Col>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Sujet
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <tbody>
                    {/* <td>{Id}</td> */}

                    <td>{sujets}</td>
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

export default Admin;
