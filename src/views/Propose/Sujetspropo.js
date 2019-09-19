import React, { Component } from "react";
import * as firebase from "firebase";
import { Link } from "react-router-dom";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
import app from "../../config/config";

class Sujetspropo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sujet_propose: []
    };
  }
  componentWillMount() {
    const ref = firebase.database().ref();
    ref.on("value", snapshot => {
      this.setState({
        sujet_propose: snapshot.val()
      });
    });
  }

  render() {
    const sujetpro = this.state.sujet_propose.map((sujetpr, i) => (
      <tr key={i}>{sujetpr.sujet_ps}</tr>
    ));

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
                      <th scope="col">Sujets</th>
                    </tr>
                  </thead>
                  <tbody>{sujetpro}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Sujetspropo;
