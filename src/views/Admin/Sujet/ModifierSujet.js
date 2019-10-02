import React, { Component, Suspense } from "react";
import Popup from "reactjs-popup";

import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Table,
  Button,
  Row
} from "reactstrap";

class Modifier extends Component {
  constructor(props) {
    super(props);
    this.handelChange = this.handelChange.bind(this);
    this.clickHandler = this.clickHandler.bind(this);
    this.state = {
      NewSujet: ""
    };
  }
  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clickHandler() {
    let sujet = this.props.clicked();
    console.log(sujet);
    this.setState({
      NewSujet: sujet.Name
    });
  }

  render() {
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
              <Button  size="sm"  style={{ backgroundColor: "#339FFF", paddingTop: "-10px" }} >
                 <i class="icons d-block cui-note" style={{fontSize :"large"}}></i> 
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
                      
                      <th></th>
                      <tbody>
                        <tr>
                          <td>
                            <input
                              className="form-control"
                              value={this.state.NewSujet}
                              name="NewSujet"
                              onChange={this.handelChange}
                            />
                          </td>
                          <td></td>
                        </tr>
                        <tr>
                          <Button  type="submit"
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

export default Modifier;