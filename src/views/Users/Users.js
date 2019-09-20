import React, { Component } from "react";
//import { Link } from 'react-router-dom';
import { Redirect } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Row,
  Table,
  Button
} from "reactstrap";

import firebase from "../../config/config";

class Sujets extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sujet_pr: [],
      buttonClicked: false
    };
    this.clickHandler = this.clickHandler.bind(this);
  }
  componentWillMount() {
    const ref = firebase.database().ref();
    ref.on("value", snapshot => {
      this.setState({
        sujet_pr: snapshot.val()
      });
    });
  }
  clickHandler() {
    this.setState({
      buttonClicked: true
    });
  }
  render() {
    const sujetpro = this.state.sujet_pr.map((sujetpr, i) => (
      <tr key={i}>{sujetpr.sujet_ps}</tr>
    ));
    const isButtonClicked = this.state.buttonClicked;
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
                  <tbody>{sujetpro}</tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        {/*mal9itch kindir n7atha f lmenu dartha hna*/}
        <Button onClick={this.clickHandler}> Login</Button>
        {isButtonClicked ? <Redirect from="/" to="login" /> : null}
      </div>
    );
  }
}
export default Sujets;
