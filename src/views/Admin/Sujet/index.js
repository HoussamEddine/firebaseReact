import React, { Component, Suspense } from "react";
import Modifier from "./ModifierSujet";
import Popup from "reactjs-popup";
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
  Row,
  Nav,
  NavItem,
  NavLink,
  Dropdown
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
import Admin from "../Admin";
import Navi from "../Navi";
import firebase from "../../../config/config";
import { blockStatement } from "@babel/types";

import * as router from "react-router-dom";

class GererSujet extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.annuler = this.annuler.bind(this);
    this.addSujet = this.addSujet.bind(this);
    this.delete = this.delete.bind(this);
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

  addSujet(e) {
    e.preventDefault();

    firebase
      .database()
      .ref("Sujets/" + ++this.state.sujetId)
      .set({
        Name: this.state.sujet,
        id: this.state.sujetId
      })
      .then(u => {
        this.setState({
          sujetAdded: true,
          message: "Ajouté avec succès"
        });
      })
      .catch(e => {
        this.setState({
          userAdded: false,
          message: "Erreur"
        });
      });
  }
  delete(e, sujetId) {
    if (sujetId === 0) {
      this.setState({ message: "cannot remove the last child" });
      return;
    }
    const ref = firebase.database().ref("Sujets");
    ref.child(sujetId).remove();
  }
  update(e, s, sujetId) {
    let sujetUp = {
      Name: s.NewSujet
    };

    const ref = firebase.database().ref("Sujets");
    ref.child(sujetId).update(sujetUp);
  }
  componentWillMount() {
    const ref = firebase.database().ref("Sujets");
    ref.on("value", snapshot => {
      let value = snapshot.val(),
        sujetId;
      if (value.length) {
        sujetId = value.length - 1;
      } else {
        for (let id in value) {
          sujetId = id;
        }
      }
      this.setState({
        sujet_pr: snapshot.val(),
        sujetId: sujetId
      });
    });
  }
  render() {
    let sujetsObj = this.state.sujet_pr,
      message = this.state.message,
      sujetsArr = [];

    for (let suj in sujetsObj) {
      const name = sujetsObj[suj];
      sujetsArr.push(name);
    }

    const sujets = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td>{sujets.Name}</td>
          <Button
            onClick={e => {
              this.delete(e, sujets.id);
            }}
          >
            Supprimer
          </Button>
          <Modifier
            update={(e, state) => {
              this.update(e, state, sujets.id);
            }}
            clicked={() => sujets}
          />
        </tr>
      );
    });

    return (
      <div>
        <DefaultAdmin />

        {/******************************************* Menu *************************

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
        </div> */}

        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div>
            <Col style={{ marginTop: "20%" }}>
              <Card>
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
                          value={this.state.sujet}
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
                    onClick={this.addSujet}
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
              </Card>
            </Col>
          </div>

          <div style={{ marginTop: "20%" }}>
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
          </div>
        </div>
      </div>
    );
  }
}
export default GererSujet;
