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
    this.addUser = this.addUser.bind(this);
    this.delete = this.delete.bind(this);
    this.state = {
      Nom: "",
      Prenom: "",
      Email: "",
      userAdded: false,
      message: null,
      presentateursId: 0,
      presentateurs: {}
    };
    // this.getIdValue();
  }
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  // getIdValue() {
  //   const ref = firebase.database().ref("UserId");

  //   ref.on("value", snap => {
  //     let val = snap.val().value;
  //     this.setState({
  //       PresentateursId: val
  //     });
  //   });
  // }
  annuler() {
    this.setState({
      Nom: "",
      Prenom: "",
      Email: ""
    });
  }
  // setIdValue() {
  //   const ref = firebase.database().ref("UserId");
  //   ref.set({
  //     value: ++this.state.PresentateursId
  //   });
  // }
  addUser(e) {
    e.preventDefault();
    // this.setIdValue();
    firebase
      .database()
      .ref("Presentateurs/" + ++this.state.presentateurId)
      .set({
        Nom: this.state.Nom,
        Prenom: this.state.Prenom,
        Email: this.state.Email,
        id: this.state.presentateurId
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
  componentWillMount() {
    const ref = firebase.database().ref("Presentateurs");
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
  delete(e, presentateurId) {
    if (presentateurId === 0) {
      this.setState({ message: "cannot remove the last child" });
      return;
    }
    const ref = firebase.database().ref("Presentateurs");
    ref.child(presentateurId).remove();
  }
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
          <td>{pres.Nom}</td>
          <td>{pres.Prenom}</td>
          <td>{pres.Email}</td>
          <Button
            onClick={e => {
              this.delete(e, pres.id);
            }}
          >
            Delete
          </Button>
        </tr>
      );
    });

    let message = this.state.message;

    return (
      <div>
        <DefaultAdmin />
        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div>
            <Col style={{ marginLeft: "auto", marginRight: "auto" }}>
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

          <div style={{ alignSelf: "center", justifySelf: "center" }}>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">Présentateur</th>
                  </tr>
                </thead>

                <tbody>
                  <td>{presentateur}</td>
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
