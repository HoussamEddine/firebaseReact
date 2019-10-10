import React, { Component, Suspense } from "react";
import Popup from "reactjs-popup";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Button,
  Row,
  Input
} from "reactstrap";
import * as firebase from "firebase";

class ModifierAffec extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.handelChange = this.handelChange.bind(this);

    this.state = {
      NewSujet: "",
      NewPresentateur: "",
      NewDate: ""
    };
  }

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clickHandler() {
    let pers = this.props.clicked();
    this.setState({
      NewSujet: pers.Sujet,
      NewPresentateur: pers.Presentateur,
      NewDate: pers.Date
    });
  }

  componentWillMount() {
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

    // Sujets pr
    const refS = firebase.database().ref("Sujets");
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

  render() {
    let sujetsObj = this.state.affectation,
      sujetsArr = [];
    for (let suj in sujetsObj) {
      const name = sujetsObj[suj];
      sujetsArr.push(name);
    }
    let presentateursObj = this.state.presentateurs,
      presentateursArr = [];
    for (let re in presentateursObj) {
      const name = presentateursObj[re];
      presentateursArr.push(name);
    }
    const state = this.state;

    return (
      <div
        className="animated fadeIn"
        onClick={this.clickHandler}
        style={{ display: "inline-block", margin: "7px 10px 0 10px" }}
      >
        <div>
          <Popup
            modal
            trigger={
              <Button size="sm" color="primary">
                <i
                  className="icons d-block cui-note"
                  style={{ fontSize: "large" }}
                ></i>
              </Button>
            }
          >
            <Row>
              <Col>
                <Card>
                  <CardHeader>
                    <i className="fa fa-align-justify"></i> Modifier
                  </CardHeader>
                  <CardBody>
                    <Table responsive hover>
                      <th>Sujet</th>
                      <th>Présentateur</th>
                      <th>Date</th>
                      <th> </th>
                      <tbody>
                        <tr>
                          <td>
                            <Input
                              type="select"
                              id="select"
                              name="NewSujet"
                              value={this.state.NewSujet}
                              onChange={this.handelChange}
                            >
                              {sujetsArr.map((es, i) => (
                                <option key={i} value={es.Name}>
                                  {es.Name}
                                </option>
                              ))}
                              ;
                            </Input>
                          </td>
                          <td>
                            <Input
                              type="select"
                              id="select"
                              name="NewPresentateur"
                              value={this.state.NewPresentateur}
                              onChange={this.handelChange}
                            >
                              {presentateursArr.map(pres => (
                                <option
                                  key={pres.id}
                                  value={pres.Prenom + " " + pres.Nom}
                                >
                                  {pres.Prenom} {pres.Nom}
                                </option>
                              ))}
                              ;
                            </Input>
                          </td>
                          <td>
                            <Input
                              name="NewDate"
                              value={this.state.NewDate}
                              onChange={this.handelChange}
                              type="date"
                            />
                          </td>
                        </tr>
                        <tr>
                          <Button
                            type="submit"
                            size="sm"
                            color="primary"
                            onClick={e => {
                              this.props.update(e, state);
                            }}
                          >
                            <i className="fa fa-dot-circle-o"></i> Eregistrer
                          </Button>
                        </tr>
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Popup>
        </div>
      </div>
    );
  }
}

export default ModifierAffec;
