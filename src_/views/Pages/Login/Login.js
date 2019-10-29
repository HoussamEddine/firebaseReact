import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import "firebase/auth";
import {
  Button,
  Card,
  CardBody,
  CardGroup,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Row
} from "reactstrap";
import { connect } from "react-redux";
import login from "../../../store/actions/loginAction";
//Css
import "./Res.css";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      user: {},
      email: "",
      password: "",
      auth: false,
      error: {}
    };
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    let auth = this.props.data.auth,
      isAuth = auth.isAuth,
      email = this.state.email,
      password = this.state.password,
      dispatch = this.props.dispatch;
    if (isAuth === true) return <Redirect to="/admin" />;
    else
      return (
        <div className="app flex-row align-items-center">
          <Container>
            <Row className="justify-content-center">
              <Col md="8">
                <CardGroup>
                  <Card className="p-4">
                    <CardBody>
                      <Form>
                        <h1 className="auth">Authentification</h1>
                        <p className="text-muted con">
                          Se connecter à votre compte
                        </p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input className="con"
                          
                            value={email}
                            onChange={this.handleChange}
                            type="text"
                            placeholder="E-mail"
                            autoComplete="username"
                            name="email"
                          />
                        </InputGroup>
                        <InputGroup className="mb-4">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-lock"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input className="con content"
                            value={password}
                            onChange={this.handleChange}
                            type="password"
                            placeholder="Mot de passe"
                            autoComplete="current-password"
                            name="password"
                          />
                        </InputGroup>
                        <Row>
                          <Col xs="6">
                            <Button
                              type="submit"
                              onClick={e =>
                                this.props.login(e, email, password, dispatch)
                              }
                              color="primary"
                              className="px-4 con"
                            >
                              Connecter
                            </Button>
                          </Col>

                          {/**<Col xs="6" className="text-right">
                            <Button color="link" className="px-0">
                              Mot de passe oublié?
                            </Button>
                          </Col> */}
                        </Row>
                        <br />
                        <br />
                        <p className="text-muted" style={{ color: "red" }}>
                          {auth.error ? auth.error.message : null}
                        </p>
                      </Form>
                    </CardBody>
                  </Card>
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
  }
}

const mapStatetoProps = state => {
  return {
    data: state
  };
};
const mapDispatchToProps = dispatch => {
  return {
    login: (e, email, password) => dispatch(login(e, email, password))
  };
};
export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(Login);
