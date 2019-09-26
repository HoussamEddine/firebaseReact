import React, { Component, Suspense } from "react";
import * as firebase from "firebase";
import * as router from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Badge,
  Button,
  CardFooter,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row
} from "reactstrap";

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
import navigation from "../Navi";

const HeaderAdmin = React.lazy(() => import("../HeaderAdmin"));

class Ajouter extends Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection("Sujets");
    this.state = {
      titre_sujet: ""
    };
  }

  onChange = e => {
    const state = this.state;
    state[e.target.name] = e.target.value;
    this.setState(state);
  };

  onSubmit = e => {
    e.preventDefault();

    const { titre_sujet } = this.state;

    this.ref
      .add({
        titre_sujet
      })
      .then(docRef => {
        this.setState({
          titre_sujet: ""
        });
        this.props.history.push("/");
      })
      .catch(error => {
        console.error("Error adding document: ", error);
      });
  };

  render() {
    const { titre_sujet } = this.state;
    return (
      <div className="app">
        {/******************************************* Menu **************************/}

        <div style={{ marginTop: "4%" }}>
          <AppSidebar fixed display="lg">
            <Suspense>
              <AppSidebarNav
                navConfig={navigation}
                {...this.props}
                router={router}
              />
            </Suspense>
          </AppSidebar>
        </div>

        <AppHeader fixed>
          <Suspense>
            <HeaderAdmin />
          </Suspense>
        </AppHeader>

        <Col
          xs="12"
          md="6"
          style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
        >
          <Card>
            <CardHeader>
              <strong>Ajouter</strong>
            </CardHeader>
            <CardBody>
              <Form onSubmit={this.onSubmit}>
                <FormGroup row>
                  <Col md="3">
                    <Label>id</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      onchange={this.handlechange}
                      type="input"
                      id="hf-email"
                      name="id"
                      autoComplete="email"
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Sujet</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      onChange={this.onChange}
                      value={this.state.titre_sujet}
                    />
                  </Col>
                  {/**
                    <Col xs="12" md="9">
                      <Input type="select" name="select" id="select">
                        <option value="0">Please select</option>
                        <option value="1">Option #1</option>
                        <option value="2">Option #2</option>
                        <option value="3">Option #3</option>
                      </Input>
                    </Col>

                    */}
                </FormGroup>
              </Form>
            </CardBody>
            <CardFooter>
              <Button type="submit" size="sm" color="primary">
                <i className="fa fa-dot-circle-o"></i> Enregistrer
              </Button>
              <Button type="reset" size="sm" color="danger">
                <i className="fa fa-ban"></i> Annuler
              </Button>
            </CardFooter>
          </Card>
        </Col>
      </div>
    );
  }
}

export default Ajouter;
