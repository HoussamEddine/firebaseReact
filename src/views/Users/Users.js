import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

// import * as firebase from "firebase";

import firebase from "../../config/config";

class Sujets extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sujet_pr: []
    };
  }
  componentWillMount() {
    const ref = firebase.database().ref("Sujets");
    ref.on("value", snapshot => {
      this.setState({
        sujet_pr: snapshot.val()
      });
    });
  }

  render() {
    const sujetpro = Object.keys(this.state.sujet_pr).map((sujet_pro, i) => {
      return (
        <tr key={i}>
          <td>{sujet_pro}</td>
        </tr>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i> Sujet
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Sujets</th>
                      <th scope="col">Présentateur</th>
                      <th scope="col">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {sujetpro}
                    {/*sujetList.map((sujet, index) =>
                      <SujetRow key={index} sujet={sujet}/>
                    )*/}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Sujets;
