import React, { Component } from "react";
import * as firebase from "firebase";
//import { Link } from 'react-router-dom';
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";
//import app from'../../config';
//import fire from '../../config/config';

class Sujetspropo extends Component {
  constructor(props) {
    super(props);
    //firebase.initializeApp(fire);
    this.state = {
      sujet_propose: []
    };
  }
  componentWillMount() {
    const ref = firebase.database().ref("Sujets");
    ref.on("value", snapshot => {
      this.setState({
        sujet_propose: snapshot.val()
      });
    });
  }

  render() {
    let sujetsObj = this.state.sujet_propose;

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
                <i className="fa fa-align-justify"></i> Sujets proosés
              </CardHeader>
              <CardBody>
                <Table responsive hover>
                  {/** <thead>
                    <tr>
                        <th scope="col">Sujets</th>

                    </tr>
                  </thead>*/}
                  <tbody>{sujets}</tbody>
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