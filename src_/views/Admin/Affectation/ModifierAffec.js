import React, { Component } from "react";
import Popup from "reactjs-popup";
import { connect } from "react-redux";
import { Card,CardBody,CardHeader,Col,Table,Button,Row,Input} from "reactstrap";
import getSujet from "../../../store/actions/getSujetPropos";
import getPresentateur from "../../../store/actions/getPresentateur";
//import "../admin.css";
import "../Resp.scss";

class ModifierAffec extends Component {
  constructor(props) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
    this.handelChange = this.handelChange.bind(this);
    this.state = {
      NewSujet: "",
      NewPresentateur: "",
      NewDate: ""
    };
  }
  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  clickHandler() {
    let pers = this.props.clicked();
    this.setState({
      NewSujet: pers.Sujet,
      NewPresentateur: pers.Presentateur,
      NewDate: pers.Date
    });
  }
 componentWillMount() {
  this.props.getPresentateur();
  this.props.getSujet();
  } 
  render() {
    const state = this.state;
    let sujetsObj = this.props.data.Sujets,
    sujetArr = [];
    let preObj = this.props.data.Presentateurs,
    presArr =[];
    for (let p in preObj){
      const name = preObj[p];
      name && presArr.push(name);
    }
    for (let s in sujetsObj){
      const name = sujetsObj[s];
      name.Name && sujetArr.push(name);
    }
    return (
      <div
        className="animated fadeIn  btn-res"
        onClick={this.clickHandler}
         >
        <div>
          <Popup
            className="popup-content"
            modal
            trigger={
              <Button size="sm" color="primary" className="btn">
                <i
                  className="icons d-block cui-note"
                  style={{ fontSize: "large" }}
                  title="Modifier"
                />
              </Button>
              } >
            {close => (
              <div>
                <Button
                  size="sm"
                  className="close"
                  onClick={close}
                  style={{ color: "red" }}
                >
                  <i class="fa fa-times-circle fa-lg " />
                </Button>
                <Row>
                  <Col>
                    <Card>
                      <CardHeader>
                        <i className="fa fa-align-justify"></i> Modifier
                      </CardHeader>
                      <CardBody>
                        <Table responsive hover>
                          <th>Sujet</th>
                          <th>Présentateur</th>
                          <th>Date</th>
                          <th> </th>
                          <tbody>
                            <tr>
                              <td>
                               {
                                <Input
                                  type="select"
                                  id="NewSujet"
                                  name="NewSujet"
                                  onChange={this.handelChange}
                                  value={this.state.NewSujet}
                                >
                                 {sujetArr.map(s => (
                                  <option value={s.Name }>
                                      {s.Name}
                                  </option>
                                  ))}
                                  ;
                                </Input>
                              }
                              </td>
                              <td>
                               {
                                <Input
                                  type="select"
                                  id="NewPresentateur"
                                  name="NewPresentateur"
                                  onChange={this.handelChange}
                                  value={this.state.NewPresentateur}
                                  //style={{ width: "max-content" }}
                                >
                                  {presArr.map(p => (
                                  <option value={p.Prenom + " " + p.Nom }>
                                     {p.Prenom} {p.Nom}
                                  </option>
                                  ))}
                                  ;
                                </Input>
                              }
                              </td>
                              <td>
                                <Input
                                  name="NewDate"
                                  value={this.state.NewDate}
                                  onChange={this.handelChange}
                                  type="date"
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
                                  close();
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
const mapStateToProps = state => {
  return {
    data: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    dispatch: dispatch,
    getSujet: () => dispatch(getSujet()),
    getPresentateur: () => dispatch(getPresentateur()),
 };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ModifierAffec);