import React, { Component, Suspense } from "react";
import Popup from "reactjs-popup";
import Content from "../../Popup/Content";
import index from "../../Popup/index.css";

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
      NewNom: "",
      NewPrenom: "",
      NewEmail: ""
    };
  }
  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clickHandler() {
    let pers = this.props.clicked();
    this.setState({
      NewNom: pers.Nom,
      NewPrenom: pers.Prenom,
      NewEmail: pers.Email
    });
  }

  render() {
    const state = this.state;
    return (
      <div
        className="animated fadeIn btn-mdf"
        onClick={this.clickHandler}
       
      >
        <div>
          <Popup
            modal
            style={index}
            trigger={
              <Button  className=" btn " size="sm" color="primary">
                <i
                  class="icons d-block cui-note"
                  style={{ fontSize: "large" }}
                ></i>
              </Button>
            }
          >
            {close => (
              <div>
               <Button 
                 size="sm"
                 className="close"
                 onClick={close}
                 style={{ color: "red" }} >
                   <i class="fa fa-times-circle fa-lg  " /> 
                </Button>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i> Modifier
                      </CardHeader>
                      <CardBody>
                        <Table responsive hover>
                          <th>Nom</th>
                          <th>Prenom</th>
                          <th>Email</th>
                          <th> </th>
                          <tbody>
                            <tr>
                              <td>
                                <input
                                  className="form-control"
                                  value={this.state.NewNom}
                                  name="NewNom"
                                  onChange={this.handelChange}
                                />
                              </td>
                              <td>
                                <input
                                  className="form-control"
                                  value={this.state.NewPrenom}
                                  name="NewPrenom"
                                  onChange={this.handelChange}
                                />
                              </td>
                              <td>
                                <input
                                  type="input"
                                  className="form-control"
                                  value={this.state.NewEmail}
                                  name="NewEmail"
                                  onChange={this.handelChange}
                                />
                              </td>
                            </tr>
                            <tr>
                              <Button
                                type="submit"
                                size="sm"
                                color="primary"
                                onClick={e => {
                                  this.props.update(e, state);
                                }}
                              >
                                <i className="fa fa-dot-circle-o"></i>{" "}
                                Eregistrer
                              </Button>
                            </tr>
                          </tbody>
                        </Table>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
              </div>
            )}
          </Popup>
        </div>
      </div>
    );
  }
}

export default Modifier;
