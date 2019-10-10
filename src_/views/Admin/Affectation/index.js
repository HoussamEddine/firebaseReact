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
import ListePre from "./ListePre";
import AddAffect from "./AddAffec";
import "./affectation.css";

class Affectation extends Component {
  constructor(props) {
    super(props);
    this.addAffect = this.addAffect.bind(this);
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
    const ref = firebase.database().ref("Sujets");
    ref.on("value", snapshot => {
      this.setState({
        Sujets: snapshot.val()
      });
    });

    /*presentateurs*/

    const refP = firebase.database().ref("Presentateurs");
    refP.on("value", snapshot => {
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
    /** Sujets pr */
    const refS = firebase.database().ref("Sujets_pr");
    refS.on("value", snapshot => {
      let value = snapshot.val(),
        AffecId;
      if (value.length) {
        AffecId = value.length - 1;
      } else {
        for (let id in value) {
          AffecId = id;
        }
      }
      this.setState({
        affectation: snapshot.val(),
        AffecId: AffecId
      });
    });
  }
  addAffect(e, sujet) {
    e.preventDefault();

    firebase
      .database()

      .ref("Sujets_pr/" + ++this.state.AffecId)
      .set({
        Sujet: sujet,
        Presentateur: this.state.Presentateur,
        Date: this.state.Date,
        id: this.state.AffecId
      })
      .then(u => {
        this.setState({
          AffecAdded: true,
          message: "Ajouté avec succès"
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          AffecAdded: false,
          message: "Erreur"
        });
      });
  }
  render() {
    let sujetsObj = this.state.Sujets,
      sujetsArr = [],
      message = this.state.message;
    for (let suj in sujetsObj) {
      const name = sujetsObj[suj].Name;
      sujetsArr.push(name);
    }

    let presentateursObj = this.state.presentateurs,
      presentateursArr = [];
    for (let pre in presentateursObj) {
      const name = presentateursObj[pre];
      presentateursArr.push(name);
    }

    const sujets = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td key={i}>{sujets}</td>
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
                {presentateursArr.map(pres => (
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
              onClick={e => this.addAffect(e, sujets)}
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
    if (!this.props.isAuth) return <Redirect to="/login" />;
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

export default Affectation;
