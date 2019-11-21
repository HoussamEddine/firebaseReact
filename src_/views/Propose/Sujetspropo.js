import React, { Component } from "react";
import { connect } from "react-redux";
import getSujets from "../../store/actions/getSujetPropos";

import { Card, CardBody, CardHeader, Col, Row, Table } from "reactstrap";

class Sujetspropo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sujet_propose: []
    };
  }
  componentDidMount() {
    this.props.getSujets();
  }

  render() {
    let sujetsObj = this.props.data.Sujets;

    let sujetsArr = [];
    for (let suj in sujetsObj) {
      const name = sujetsObj[suj];
      name.Name && sujetsArr.push(name);
    }

    const sujets = sujetsArr.map((sujets, i) => {
      return (
        <tr key={i}>
          <td>{sujets.Name}</td>
        </tr>
      );
    });

    return (
      <div className="animated fadeIn">
        <Row>
          <Col xl={6}>
            <Card>
              <CardHeader>
                <i className="fa fa-align-justify"></i>
              </CardHeader>
              <CardBody>
                <Table responsive hover>
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
const mapStateToProps = state => {
  return {
    data: state
    //  ids: state.sujetId : 3lach zadti hadi rah kolchi 3andak f data
  };
};
const mapDispatchToProps = dispatch => {
  return {
    getSujets: cb => dispatch(getSujets())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sujetspropo);