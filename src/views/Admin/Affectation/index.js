import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Input,
  Button,
  CardFooter
} from "reactstrap";
import Menu from "../Menu";
import DefaultAdmin from "../DefaultAdmin";
import "../Resp.scss";
import { connect } from "react-redux";
import getSujets from "../../../store/actions/getSujetPropos";
import getSujetsPl from "../../../store/actions/getSujetPlanif";
import getPresentateurs from "../../../store/actions/getPresentateur";
import affectation from "../../../store/actions/affectationAction";
import added from "../../../store/actions/addedMsg";

class Affectation extends Component {
  constructor(props) {
    super(props);
    this.handelChange = this.handelChange.bind(this);
    this.annuler = this.handelChange.bind(this);
    this.state = {
      Sujets: []
    };
  }
  reset() {
    document.getElementById("presentateur").value =
      "-- Sélectionnez un présentateur --";
    document.getElementById("date").value = " ";
  }
  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentWillMount() {
    this.props.getSujetsPl();
    this.props.getSujets();
    this.props.getPresentateurs();
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
    let sujetsObj = this.props.data.Sujets,
      sujetsArr = [],
      message = this.props.data.added.message,
      affectId = this.props.data.SujetsPl.affectId,
      Presentateur = this.state.Presentateur,
      date = this.state.Date,
      auth = this.props.data.auth,
      isAuth = auth.isAuth;

    for (let suj in sujetsObj) {
      const name = sujetsObj[suj];
      name.Name && sujetsArr.push(name);
    }
    let dataObj = this.props.data.Presentateurs,
      dataArr = [];
    for (let pre in dataObj) {
      const name = dataObj[pre];
      name.Email && dataArr.push(name);
    }
    const sujets = sujetsArr.map((sujet, i) => {
      return (
        <tr key={i}>
          <td key={i}>{sujet.Name}</td>
          <td>
            {
              <Input
                type="select"
                id="presentateur"
                onChange={this.handelChange}
                name="Presentateur"
              >
                <option disabled selected value>
                  -- Sélectionnez un présentateur --
                </option>
                {dataArr.map(pres => (
                  <option value={pres.Prenom + " " + pres.Nom}>
                    {pres.Prenom} {pres.Nom}
                  </option>
                ))}
                ;
              </Input>
            }
          </td>
          <td>
            <Input
              id="date"
              name="Date"
              onChange={this.handelChange}
              type="date"
            />
          </td>
          <td>
            <Button
              type="submit"
              size="sm"
              color="primary"
              onClick={(e, dbName, dbNameS, ids, id, s, presentateur, d) => {
                this.props.affectation(
                  "Sujets_pr",
                  "Sujets",
                  sujet.id,
                  affectId,
                  sujet.Name,
                  Presentateur,
                  date
                );
                this.reset();
              }}
              title="Affecter"
            >
              <i
                className="icons d-block cui-share"
                style={{ fontSize: "large" }}
              ></i>
            </Button>
          </td>
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

          <Row>
            <Col xl={7} className="affectation-column">
              <Card>
                <CardHeader>
                  <i className="fa fa-align-justify"></i>
                  <strong>Affectation</strong>
                </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <tr>
                        <th scope="col">Sujets</th>
                        <th scope="col">Presentateurs</th>
                        <th scope="col">Date</th>
                        <th />
                      </tr>
                    </thead>
                    <tbody>{sujets}</tbody>
                  </Table>
                </CardBody>
                <CardFooter>
                  <p
                    className="text-muted"
                    style={{ display: "inline-block", marginLeft: "25px" }}
                  >
                    {message}
                  </p>
                </CardFooter>
              </Card>
            </Col>
          </Row>
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
    getSujetsPl: () => dispatch({ type: "SUJET_REQUESTED" }),
    getSujets: () => dispatch({ type: "SUJETPROPOS_REQUESTED" }),
    getPresentateurs: () => dispatch({ type: "PRESENTATEURS_REQUESTED" }),
    affectation: (
      dbName,
      dbNameS,
      sujetId,
      affectId,
      sujet,
      presentateur,
      date
    ) =>
      dispatch({
        type: "AFFECTATION_SA",
        dbName,
        dbNameS,
        sujetId,
        affectId,
        sujet,
        presentateur,
        date
      })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Affectation);
