import React, { Component } from "react";
import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

import getSujetsArch from "../../store/actions/getSujetArch";
import { connect } from "react-redux";

class SujetArch extends Component {
  componentWillMount() {
    this.props.getSujetsArch();
  }
  render() {
    let sujetarchObj = this.props.data.Sujetsarch; 
    let sujetsArr = [];
    for (let suj in sujetarchObj) {
      const name = sujetarchObj[suj];
      name.Sujet && sujetsArr.push(name);
    }
    const Sujetsarch = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td>{sujets.Sujet}</td>
          <td>{sujets.Presentateur}</td>
          <td>{sujets.Date}</td>
          <td>
              <a href={sujets.Lien} target="_blank" >
                {sujets.Lien}
              </a>
            <br/>
              <a href={sujets.Lien2} target="_blank" aria-label="2éme Lien">
                 {sujets.Lien2}
              </a>
          </td>
        </tr>
      );
    });
return (
      <div className="animated fadeIn">
        <Row>
         <Col xl={8}>
          <Card>
            <CardHeader></CardHeader>
            <CardBody>
              <Table responsive hover>
                    <thead>
                      <tr>
                          <th scope="col">Sujet</th>
                          <th scope="col">Présentateur</th>
                          <th scope="col">Date</th>
                          <th scope="col">Lien</th>
                      </tr>
                    </thead> 
                    <tbody>{Sujetsarch}</tbody>
                </Table> 
             </CardBody>
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
    getSujetsArch: () => dispatch(getSujetsArch())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SujetArch);

  