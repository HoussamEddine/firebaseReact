import React, { Component } from "react";
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
import Modifier from "./ModifierSujet";
import DefaultAdmin from "../DefaultAdmin";
import Menu from "../Menu";
import { connect } from "react-redux";
import getSujets from "../../../store/actions/getSujetPropos";
import addSujet from "../../../store/actions/addSujetAction";
import deleteSP from "../../../store/actions/deleteAllAction";
import updateAction from "../../../store/actions/updateAllAction";
import added from "../../../store/actions/addedMsg";
//import "./Res-sujet.css";
import "../Resp.scss";

class GererSujet extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.annuler = this.annuler.bind(this);
    this.state = {
      //  sujet: "",
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
  // componentWillReceiveProps(p) {
  //   if (p.data.added.added) {
  //     setTimeout(
  //       () => this.props.dispatch(added("affectation", false, "")),
  //       3000
  //     );
  //   }
  // }
  render() {
    console.log(data);
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
      name.Name && sujetsArr.push(name);
    }
    const sujets = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td style={{ width: "486px" }}>{sujets.Name}</td>
          <div style={{ float: "right" }}>
            <Button
              title="Supprimer"
              className=" btn btn-mdf"
              size="sm"
              color="danger"
              onClick={() => {
                this.props.deleteSP("Sujets", sujets.id);
              }}
            >
              <i
                className="icons d-block cui-trash"
                style={{ fontSize: "large" }}
              ></i>
            </Button>
            <Modifier
              update={(dbName, state, Id, ds) => {
                this.props.update("Sujets", state, sujets.id, dispatch);
              }}
              clicked={() => sujets}
            />
          </div>
        </tr>
      );
    });
    if (isAuth === undefined || isAuth === false)
      return <Redirect to="/login" />;
    else
      return (
        <div className="app">
          <DefaultAdmin />
          <Menu />
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
                      onClick={() => {
                        this.props.addSujet("Sujets", sujetId, sujet);
                        this.annuler();
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
                          <th></th>
                        </tr>
                      </thead>
                      <tbody>{sujets}</tbody>
                    </Table>
                  </CardBody>
                  <CardFooter />
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
    getSujets: () => dispatch({ type: "SUJETPROPOS_REQUESTED" }),
    addSujet: (dbName, id, suj) =>
      //  dispatch(addSujet(e, dbName, id, suj)),
      dispatch({ type: "ADD_SUJET", dbName, id, suj }),
    deleteSP: (dbName, id) => {
      return dispatch({ type: "DELETE_ALL", dbName, id });
      // cb(dbName,id);
    },
    update: (dbName, s, id) => {
      dispatch({ type: "UPDATE_S", dbName, s, id });
    }
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(GererSujet);
