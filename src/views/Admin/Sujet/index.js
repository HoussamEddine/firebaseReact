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
    this.annuler = this.annuler.bind(this);
    this.addSujet = this.addSujet.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      sujet: "",
      sujetAdded: false,
      message: null,

      presentateurs: {}
    };
    // this.getIdValue();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // getIdValue() {
  //   const ref = firebase.database().ref("SujetId");

  //   ref.on("value", snap => {
  //     let val = snap.val().value;
  //     this.setState({
  //       sujetId: val
  //     });
  //   });
  // }
  annuler() {
    this.setState({
      sujet: "",
      message: ""
    });
  }
  // setIdValue() {
  //   const ref = firebase.database().ref("SujetId");
  //   ref.set({
  //     value: ++this.state.sujetId
  //   });
  // }
  addSujet(e) {
    e.preventDefault();
    // this.setIdValue();
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
          message: "added succeffuly"
        });
      })
      .catch(e => {
        this.setState({
          userAdded: false,
          message: "error adding subject"
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
            Delete
          </Button>
        </tr>
      );
    });

    return (
      <div>
        <DefaultAdmin />
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
export default AjoutPresentateur;
