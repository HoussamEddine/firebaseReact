import React, { Component } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  ListGroup,
  ListGroupItem,
  Table,
  Badge,
  Button,
  CardFooter,
  Collapse,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Fade,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Row
} from "reactstrap";

import {
  AppAside,
  AppFooter,
  AppHeader,
  AppSidebar,
  AppSidebarFooter,
  AppSidebarForm,
  AppSidebarHeader,
  AppSidebarMinimizer,
  AppBreadcrumb2 as AppBreadcrumb,
  AppSidebarNav2 as AppSidebarNav
} from "@coreui/react";
import DefaultAdmin from "../DefaultAdmin";

import firebase from "../../../config/config";
import { blockStatement } from "@babel/types";

class AjoutPresentateur extends Component {
  constructor(props) {
    super(props);
    // this.handleChange = this.handleChange.bind(this);
    // this.annuler = this.annuler.bind(this);
    // this.addUser = this.addUser.bind(this);
    this.state = {
      Nom: "",
      Prenom: "",
      Email: "",
      userAdded: false,
      message: null,
      presentateursId: 0,
      presentateurs: {}
    };
    // this.getIdValue();
  }
  // handleChange(e) {
  //   this.setState({ [e.target.name]: e.target.value });
  // }
  // getIdValue() {
  //   const ref = firebase.database().ref("UserId");

  //   ref.on("value", snap => {
  //     let val = snap.val().value;
  //     this.setState({
  //       PresentateursId: val
  //     });
  //   });
  // }
  // annuler() {
  //   this.setState({
  //     Nom: "",
  //     Prenom: "",
  //     Email: ""
  //   });
  // }
  // setIdValue() {
  //   const ref = firebase.database().ref("UserId");
  //   ref.set({
  //     value: ++this.state.PresentateursId
  //   });
  // }
  // addUser(e) {
  //   e.preventDefault();
  //   this.setIdValue();
  //   firebase
  //     .database()
  //     .ref("Presentateurs/" + this.state.PresentateursId)
  //     .set({
  //       Nom: this.state.Nom,
  //       Prenom: this.state.Prenom,
  //       Email: this.state.Email
  //     })
  //     .then(u => {
  //       this.setState({
  //         userAdded: true,
  //         message: "added succeffuly"
  //       });
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setState({
  //         userAdded: false,
  //         message: "error adding User"
  //       });
  //     });
  // }
  componentWillMount() {
    const ref = firebase.database().ref("Sujets");
    ref.on("value", snapshot => {
      this.setState({
        sujet_pr: snapshot.val()
      });
    });
  }
  render() {
    let sujetsObj = this.state.sujet_pr;
    // const Id = Object.keys(sujetsObj).map((id, i) => {
    //   return (
    //     <tr key={i}>
    //       <td>{id}</td>
    //     </tr>
    //   );
    // });
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
      <div>
        <DefaultAdmin />
        <div style={{ display: "grid", gridTemplateColumns: "50% 50%" }}>
          <div>
            <Col style={{ marginTop: "20%" }}>
              <Card>
                <CardHeader>
                  <strong>Ajouter</strong>
                </CardHeader>
                <CardBody>
                  <Form onSubmit={this.onSubmit}>
                    {/* <FormGroup row>
                      <Col md="3">
                        <Label>id</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          onchange={this.handlechange}
                          type="input"
                          id="hf-email"
                          name="id"
                          autoComplete="email"
                        />
                      </Col>
                    </FormGroup> */}
                    <FormGroup row>
                      <Col md="3">
                        <Label>Sujet</Label>
                      </Col>
                      <Col xs="12" md="9">
                        <Input
                          onChange={this.onChange}
                          value={this.state.titre_sujet}
                        />
                      </Col>
                      {/**
          <Col xs="12" md="9">
            <Input type="select" name="select" id="select">
              <option value="0">Please select</option>
              <option value="1">Option #1</option>
              <option value="2">Option #2</option>
              <option value="3">Option #3</option>
            </Input>
          </Col>

          */}
                    </FormGroup>
                  </Form>
                </CardBody>
                <CardFooter>
                  <Button type="submit" size="sm" color="primary">
                    <i className="fa fa-dot-circle-o"></i> Enregistrer
                  </Button>
                  <Button type="reset" size="sm" color="danger">
                    <i className="fa fa-ban"></i> Annuler
                  </Button>
                </CardFooter>
              </Card>
            </Col>
          </div>

          <div style={{ marginTop: "20%" }}>
            <CardBody>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th scope="col">Sujets</th>
                  </tr>
                </thead>

                <tbody>
                  <td>{sujets}</td>
                </tbody>
              </Table>
            </CardBody>
          </div>
        </div>
      </div>
    );
  }
}
export default AjoutPresentateur;
