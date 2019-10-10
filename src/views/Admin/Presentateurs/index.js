import React, { Component, Suspense } from "react";
import Modifier from "./ModifierPresentateur";
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import Navi from "../Navi";

import { Redirect, Route, Switch } from "react-router-dom";
import * as router from "react-router-dom";
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

// import {
//   AppAside,
//   AppFooter,
//   AppHeader,
//   AppSidebar,
//   AppSidebarFooter,
//   AppSidebarForm,
//   AppSidebarHeader,
//   AppSidebarMinimizer,
//   AppBreadcrumb2 as AppBreadcrumb,
//   AppSidebarNav2 as AppSidebarNav
// } from "@coreui/react";
import DefaultAdmin from "../DefaultAdmin";

import "../Sujet/Res-sujet.css";

import firebase from "../../../config/config";
// import { blockStatement } from "@babel/types";

class AjoutPresentateur extends Component {
  constructor(props) {
    super(props);
    this.handelChange = this.handelChange.bind(this);
    // this.handelNewChange = this.handelNewChange.bind(this);
    this.annuler = this.annuler.bind(this);
    this.addUser = this.addUser.bind(this);
    this.delete = this.delete.bind(this);
    this.update = this.update.bind(this);
    this.state = {
      Nom: "",
      Prenom: "",
      Email: "",
      NewNom: "",
      NewPrenom: "",
      NewEmail: "",
      userAdded: false,
      message: null,
      presentateursId: 0,
      presentateurs: {}
    };
  }
  handelChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  annuler() {
    this.setState({
      Nom: "",
      Prenom: "",
      Email: ""
    });
  }

  addUser(e) {
    e.preventDefault();

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
          message: "Ajouté avec succès"
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          userAdded: false,
          message: "Erreur"
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
  delete(e, presentateurId, pArr) {
    if (pArr.length === 1) {
      this.setState({ message: "cannot remove the last child" });
      return;
    }
    const ref = firebase.database().ref("Presentateurs");
    ref.child(presentateurId).remove();
  }
  update(e, s, presentateurId) {
    let presentateurUp = {
      Nom: s.NewNom,
      Prenom: s.NewPrenom,
      Email: s.NewEmail
    };

    const ref = firebase.database().ref("Presentateurs");
    ref.child(presentateurId).update(presentateurUp);
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

          <Button className=" btn "
            size="sm"
            color="danger"
            onClick={e => {
              this.delete(e, pres.id, presentateursArr);
            }}
          >
            <i
              class="icons d-block cui-trash"
              style={{ fontSize: "large" }}
            ></i>
          </Button>
          <Modifier
            update={(e, state) => {
              this.update(e, state, pres.id);
            }}
            clicked={() => pres}
          />
        </tr>
      );
    });

    let message = this.state.message;
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
              <AppSidebarNav navConfig={Navi} {...this.props} router={router} />
            </Suspense>
            <AppSidebarFooter />
            <AppSidebarMinimizer />
          </AppSidebar>
        </div>

        <div  className="Sujet-column" >
          <div  >
            <Col>
              <Card>
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
                          name="Nom"
                          autoComplete="nom"
                          value={this.state.Nom}
                          onChange={this.handelChange}
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
                          onChange={this.handelChange}
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
                          onChange={this.handelChange}
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
            <Col>
              <Card>
                <CardHeader>
                  <strong>Modifier / Supprimer</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <tbody>
                      <td>{presentateur}</td>
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
export default AjoutPresentateur;
