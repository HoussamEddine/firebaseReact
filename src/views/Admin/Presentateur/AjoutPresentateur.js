import React, { Component } from "react";
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
import DefaultAdmin from "../DefaultAdmin";

import firebase from "../../../config/config";
import { blockStatement } from "@babel/types";

class AjoutPresentateur extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.addUser = this.addUser.bind(this);
    this.state = {
      Nom: "",
      Prenom: "",
      Email: "",
      userAdded: false,
      message: null,
      presentateursId: 0
    };
    this.getIdValue();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  getIdValue() {
    const ref = firebase.database().ref("UserId");

    ref.on("value", snap => {
      let val = snap.val().value;
      this.setState({
        PresentateursId: val
      });
    });
  }
  setIdValue() {
    const ref = firebase.database().ref("UserId");
    ref.set({
      value: ++this.state.PresentateursId
    });
  }
  addUser(e) {
    e.preventDefault();
    this.setIdValue();
    firebase
      .database()
      .ref("Presentateurs/" + this.state.PresentateursId)
      .set({
        Nom: this.state.Nom,
        Prenom: this.state.Prenom,
        Email: this.state.Email
      })
      .then(u => {
        this.setState({
          userAdded: true,
          message: "added succeffuly"
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          userAdded: false,
          message: "error adding User"
        });
      });
  }
  render() {
    console.log(this.state.PresentateursId);
    let message = this.state.message;

    return (
      <div className="app">
        <DefaultAdmin />
        <Col
          xs="12"
          md="6"
          style={{ marginLeft: "auto", marginRight: "auto", width: "50%" }}
        >
          <Card style={{ marginTop: "94px" }}>
            <CardHeader>
              <strong>Ajouter</strong>
            </CardHeader>
            <CardBody>
              <Form>
                <FormGroup row>
                  <Col md="3">
                    <Label>Nom</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="input"
                      id="hf-email"
                      name="Nom"
                      autoComplete="nom"
                      value={this.state.Nom}
                      onChange={this.handleChange}
                    />
                  </Col>
                </FormGroup>
                <FormGroup row>
                  <Col md="3">
                    <Label>Prenom</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      name="Prenom"
                      autoComplete="prenom"
                      value={this.state.Prenom}
                      onChange={this.handleChange}
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
                <FormGroup row>
                  <Col md="3">
                    <Label>E-mail</Label>
                  </Col>
                  <Col xs="12" md="9">
                    <Input
                      type="input"
                      id="hf-email"
                      name="Email"
                      autoComplete="Email"
                      value={this.state.Email}
                      onChange={this.handleChange}
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
                onClick={this.addUser}
              >
                <i className="fa fa-dot-circle-o"></i> Enregistrer
              </Button>
              <Button type="reset" size="sm" color="danger">
                <i className="fa fa-ban"></i> Annuler
              </Button>
              <p
                className="text-muted"
                style={{ display: "inline-block", marginLeft: "25px" }}
              >
                {message}
              </p>
            </CardFooter>
          </Card>
        </Col>
      </div>
    );
  }
}
export default AjoutPresentateur;
