import React, { Component, Suspense } from "react";
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
import {
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import firebase from "../../../config/config";

import DefaultAdmin from "../DefaultAdmin";
import * as router from "react-router-dom";
import Navi from "../Navi";
import "./affectation.css";

import { connect } from "react-redux";
import getSujets from "../../../store/actions/sujetsPro";
import getPresentateurs from "../../../store/actions/presentateurs";

// api

import addAffect from "./../../../api/addAffect";

class Affectation extends Component {
  constructor(props) {
    super(props);

    this.handelChange = this.handelChange.bind(this);

    this.state = {
      Sujets: []
    };
  }
  handelChange = e => {
    this.setState({
      [e.target.name]: e.target.value ? e.target.value : e.currentTarget.value
    });
  };

  componentWillMount() {
    this.props.getSujets();
    this.props.getPresentateurs();
  }
  render() {
    let sujetsObj = this.props.data.Sujets,
      dispatch = this.props.dispatch,
      sujetsArr = [],
      message = this.props.data.added.message,
      affectId = this.props.data.SujetsPl.affectId,
      Presentateur = this.state.Presentateur,
      date = this.state.Date,
      auth = this.props.data.auth,
      isAuth = auth.isAuth;
    for (let suj in sujetsObj) {
      const name = sujetsObj[suj].Name;

      name && sujetsArr.push(name);
    }

    let dataObj = this.props.data.Presentateurs,
      dataArr = [];
    for (let pre in dataObj) {
      const name = dataObj[pre];

      name.Email && dataArr.push(name);
    }
    console.log(dataArr);
    const sujets = sujetsArr.map((sujet, i) => {
      return (
        <tr key={i}>
          <td key={i}>{sujet}</td>
          <td>
            {
              <Input
                type="select"
                id="select"
                onChange={this.handelChange}
                name="Presentateur"
              >
                <option disabled selected value>
                  -- Selectionnez un Présentateur --
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
            <Input name="Date" onChange={this.handelChange} type="date" />
          </td>
          <td>
            <Button
              type="submit"
              size="sm"
              color="primary"
              onClick={(e, dbName, id, s, presentateur, d, dispa) => {
                addAffect(
                  e,
                  "Sujets_pr",
                  affectId,
                  sujet,
                  Presentateur,
                  date,
                  dispatch
                );
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
    if (isAuth === false) return <Redirect to="/login" />;
    else
      return (
        <div className="app">
          <DefaultAdmin />

          {/******************************************* Menu ************************* */}

          <div style={{ marginTop: "54px", width: "10%" }}>
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
                        <th></th>
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
    getSujets: () => dispatch(getSujets()),
    getPresentateurs: () => dispatch(getPresentateurs()),
    dispatch: dispatch
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Affectation);
