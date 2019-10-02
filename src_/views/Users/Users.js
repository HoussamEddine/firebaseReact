import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

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
    let sujetsObj = this.state.sujet_pr;
    const Id = Object.keys(sujetsObj).map((id, i) => {
      return (
        <tr key={i}>
          <td>{id}</td>
        </tr>
      );
    });
    let sujetsArr = [];
    for (let suj in sujetsObj) {
      const name = sujetsObj[suj].Name;
      sujetsArr.push(name);
    }

    const sujets = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td>{sujets}</td>
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
                    <td>{Id}</td>

                    <td>{sujets}</td>
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