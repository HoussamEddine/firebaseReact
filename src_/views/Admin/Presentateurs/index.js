import React, { Component } from "react";
import Modifier from "./ModifierPresentateur";
import Menu from "../Menu"
import { Redirect } from "react-router-dom";
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
import { connect } from "react-redux";
import getPresentateurs from "../../../store/actions/getPresentateur";
import deleteSP from "../../../store/actions/deleteAllAction";
import update from "../../../store/actions/updateAllAction";
import addPresentateur from "../../../store/actions/addPresentateurAction";
import { added } from "../../../store/actions/addedMsg";
//import "../Sujet/Res-sujet.css";

class AjoutPresentateur extends Component {
  constructor(props) {
    super(props);
    this.handelChange = this.handelChange.bind(this);

    this.annuler = this.annuler.bind(this);

    this.state = {
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
  componentWillReceiveProps(p) {
    if (p.data.added.added) {
      setTimeout(
        () => this.props.dispatch(added("affectation", false, "")),
        3000
      );
    }
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
          <div style={{ float:"right"}}>
              <Button
                className=" btn "
                size="sm"
                color="danger"
                title="Supprimer"
                onClick={e => {
                  this.props.deleteSP("Presentateurs", pres.id, dispatch);
                }} >
                <i
                  className="icons d-block cui-trash"
                  style={{ fontSize: "large" }}
                />
              </Button>
              <Modifier
                update={(dbName, state, id, ds) => {
                  this.props.update("Presentateurs", state, pres.id, dispatch);
                }}
                clicked={() => pres} />
          </div>
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
          <Menu />
          <div className="Sujet-column">
            <div>
              <Col className="col">
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
                            onChange={this.handelChange} />
                          <br />
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
                            onChange={this.handelChange} />
                          <br />
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
                          Email,
                          this.annuler()
                        )} 
                    >
                      <i className="fa fa-dot-circle-o"/> Enregistrer
                    </Button>
                    <Button
                      type="reset"
                      size="sm"
                      color="danger"
                      onClick={this.annuler}
                    >
                      <i className="fa fa-ban"/> Annuler
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
              <Col className="col">
                <Card>
                  <CardHeader>
                    <strong>Modifier / Supprimer</strong>
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <tbody>
                        {presentateur}
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter/>
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
    dispatch: dispatch,
    getPresentateurs: () => dispatch(getPresentateurs()),
    deleteSP: (dbName, id, ds) => dispatch(deleteSP(dbName, id, ds)),
    update: (dbName, s, id, ds) => dispatch(update(dbName, s, id, ds)),
    addPresentateur: (e, dbName, id, nom, prenom, email) =>
      dispatch(addPresentateur(e, dbName, id, nom, prenom, email))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AjoutPresentateur);
