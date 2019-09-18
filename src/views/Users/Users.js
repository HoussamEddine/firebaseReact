import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import firebase from "../../config/config";

import { tsConstructorType } from "@babel/types";
//import sujetsData from './UsersData'

/*function SujetRow(props) {
  const sujet = props.sujet
  const sujetLink = `/users/${sujet.id}`


  return (
    <tr key={sujet.id.toString()}>
      <th scope="row">{sujet.id}</th>
      <td><Link to={sujetLink}>{sujet.nsujet}</Link></td>
      <td>{sujet.presentateur}</td>
      <td>{sujet.date}</td>
   </tr>
  )
}*/

class Sujets extends Component {
  constructor() {
    super();
  }

  componentWillMount() {
    const ref = firebase.database().ref();
    ref.on("value", snapshot => {
      this.setState({
        data: snapshot.val()
      });
    });
  }

  render() {
    // const sujetList = sujetsData.filter((sujet) => sujet.id < 10)
    // const sujetpr = this.state.data.map(suj => <h1>{suj.titre_sujet}</h1>);
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
                  {/* {sujetpr} */}
                  <tbody>
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
