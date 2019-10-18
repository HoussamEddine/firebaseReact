import React, { Component, Suspense } from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Modifier from "./ModifierSujet";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Button,
  CardFooter,
  Form,
  FormGroup,
  Input,
  Label
} from "reactstrap";

import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import DefaultAdmin from "../DefaultAdmin";
// import Admin from "../Admin";
import Navi from "../Navi";

// import { blockStatement } from "@babel/types";

import * as router from "react-router-dom";
import "./Res-sujet.css";

import getSujets from "../../../store/actions/sujetsPro";
import { connect } from "react-redux";

// api
import deleteElem from "./../../../api/delete";
import update from "./../../../api/update";
import addSujet from "./../../../api/addSujet";

class GererSujet extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.annuler = this.annuler.bind(this);

    this.state = {
      sujet: "",
      sujetAdded: false,
      message: null,
      dropdownOpen: [false, false],
      presentateurs: {}
    };
  }
  toggle(i) {
    const newArray = this.state.dropdownOpen.map((element, index) => {
      return index === i ? !element : false;
    });
    this.setState({
      dropdownOpen: newArray
    });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  annuler() {
    this.setState({
      sujet: "",
      message: ""
    });
  }

  componentWillMount() {
    this.props.getSujets();
  }
  render() {
    let data = this.props.data,
      message = data.added.message,
      dispatch = this.props.dispatch,
      sujetsArr = [],
      sujetId = this.props.data.Sujets.sujetId,
      sujet = this.state.sujet,
      auth = this.props.data.auth,
      isAuth = auth.isAuth;

    for (let suj in data.Sujets) {
      const name = data.Sujets[suj];
      sujetsArr.push(name);
    }
    const sujets = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td>{sujets.Name}</td>
          <td></td>
          <td></td>
          <td></td>
          <td style={{ float: "left" }}>
            <Button
              className=" btn btn-mdf"
              size="sm"
              color="danger"
              onClick={() => {
                deleteElem("Sujets", sujets.id);
              }}
            >
              <i
                class="icons d-block cui-trash"
                style={{ fontSize: "large" }}
              ></i>
            </Button>
            <Modifier
              update={(dbName, state, Id) => {
                update("Sujets", state, sujets.id);
              }}
              clicked={() => sujets}
            />
          </td>
        </tr>
      );
    });

    if (isAuth === false) return <Redirect to="/login" />;
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

          <div className="Sujet-column">
            <Col>
              <Card>
                <div>
                  <CardHeader>
                    <strong>Ajouter</strong>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <FormGroup row>
                        <Col md="3">
                          <Label>Sujet</Label>
                        </Col>
                        <Col xs="12" md="9">
                          <Input
                            onChange={this.handleChange}
                            value={sujet}
                            name="sujet"
                          />
                        </Col>
                      </FormGroup>
                    </Form>
                  </CardBody>
                  <CardFooter>
                    <Button
                      type="submit"
                      size="sm"
                      color="primary"
                      onClick={(e, dbName, id, suj, ds) => {
                        addSujet(e, "Sujets", sujetId, sujet, dispatch);
                      }}
                    >
                      <i className="fa fa-dot-circle-o"></i> Enregistrer
                    </Button>
                    <Button
                      type="reset"
                      size="sm"
                      color="danger"
                      onClick={this.annuler}
                    >
                      <i className="fa fa-ban"></i> Annuler
                    </Button>
                    <p
                      className="text-muted"
                      style={{ display: "inline-block", marginLeft: "25px" }}
                    >
                      {message}
                    </p>
                  </CardFooter>
                </div>
              </Card>
            </Col>

            <div style={{ alignSelf: "center", justifySelf: "center" }}>
              <Col>
                <CardHeader>
                  <strong>Modifier / Supprimer</strong>
                </CardHeader>
                <Card>
                  <CardBody>
                    <Table responsive hover>
                      <thead>
                        <tr>
                          <th scope="col">Sujets</th>
                        </tr>
                      </thead>

                      <tbody>
                        <td>{sujets}</td>
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </Col>
            </div>
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
    getSujets: () => dispatch(getSujets()),
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GererSujet);
