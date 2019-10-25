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

import DefaultAdmin from "../DefaultAdmin";

import "../Sujet/Res-sujet.css";

import { connect } from "react-redux";
import getPresentateurs from "../../../store/actions/getPresentateur";

import deleteSP from "../../../store/actions/deleteAction";
import update from "../../../store/actions/updateAction";
import addPresentateur from "../../../store/actions/addPresentateurAction";

class AjoutPresentateur extends Component {
  constructor(props) {
    super(props);
    this.handelChange = this.handelChange.bind(this);

    this.annuler = this.annuler.bind(this);

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

  componentWillMount() {
    this.props.getPresentateurs();
  }

  render() {
    let presentateursObj = this.props.data.Presentateurs,
      presentateursArr = [],
      presentateurId = this.props.data.Presentateurs.presentateurId,
      dispatch = this.props.dispatch,
      Nom = this.state.Nom,
      Prenom = this.state.Prenom,
      Email = this.state.Email,
      auth = this.props.data.auth,
      isAuth = auth.isAuth;
    for (let pre in presentateursObj) {
      const name = presentateursObj[pre];
      name.Email && presentateursArr.push(name);
    }

    let presentateur = presentateursArr.map((pres, i) => {
      return (
        <tr key={i}>
          <td>{pres.Nom}</td>
          <td>{pres.Prenom}</td>
          <td>{pres.Email}</td>

          <Button
            className=" btn "
            size="sm"
            color="danger"
            onClick={e => {
              this.props.deleteSP("Presentateurs", pres.id);
            }}
          >
            <i
              class="icons d-block cui-trash"
              style={{ fontSize: "large" }}
            ></i>
          </Button>
          <Modifier
            update={(dbName, state, id) => {
              this.props.update("Presentateurs", state, pres.id);
            }}
            clicked={() => pres}
          />
        </tr>
      );
    });

    let message = this.props.data.added.message;
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

          <div className="Sujet-column">
            <div>
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
                      onClick={(e, dbName, id, nom, prenom, email) =>
                        this.props.addPresentateur(
                          e,
                          "Presentateurs",
                          presentateurId,
                          Nom,
                          Prenom,
                          Email
                        )
                      }
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

const mapStateToProps = state => {
  return {
    data: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getPresentateurs: () => dispatch(getPresentateurs()),
    deleteSP: (dbName, id) => dispatch(deleteSP(dbName, id)),
    update: (dbName, s, id) => dispatch(update(dbName, s, id)),
    addPresentateur: (e, dbName, id, nom, prenom, email) =>
      dispatch(addPresentateur(e, dbName, id, nom, prenom, email))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AjoutPresentateur);
