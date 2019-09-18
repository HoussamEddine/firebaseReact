import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Badge, Card, CardBody, CardHeader, Col, Row, Table } from 'reactstrap';

import sujetspropdat from './sujetspropdata'

function SujetRow(props) {
  const sujet = props.sujet
  const sujetLink = `/propose/${sujet.id}`

  const getBadge = (status) => {
    return status === 'Active' ? 'success' :
      status === 'Inactive' ? 'secondary' :
        status === 'Pending' ? 'warning' :
          status === 'Banned' ? 'danger' :
            'primary'
  }

  return (
    <tr key={sujet.id.toString()}>
      <th scope="row">{sujet.id}</th>
      <td><Link to={sujetLink}>{sujet.nsujet}</Link></td>
      {/**<td>{sujet.presentateur}</td>
      <td>{sujet.date}</td> */}
   </tr>
  )
}

class Sujetspropo extends Component {

  render() {

    const sujetList = sujetspropdat.filter((sujet) => sujet.id < 10)

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

                     {/**<th scope="col">Présentateur</th>
                      <th scope="col">Date</th> */} 
                      
                    </tr>
                  </thead>
                  <tbody>
                    {sujetList.map((sujet, index) =>
                      <SujetRow key={index} sujet={sujet}/>
                    )}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Sujetspropo;
