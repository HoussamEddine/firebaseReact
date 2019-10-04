import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import fire from "../../../config/config";
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
import Admin from "../../Admin/Admin";

class Login extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.login = this.login.bind(this);
    this.state = {
      user: {},
      email: "",
      password: "",
      auth: false,
      error: {}
    };
  }

  login(e) {
    this.setState({
      auth: true,
      error: null
    });
    e.preventDefault();
    fire
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(u => {
        this.setState({
          isLoggedIn: true
        });
      })
      .catch(error => {
        this.setState({
          error,
          isLoggedIn: false
        });
      });
  }

  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    if (this.props.isAuth) return <Redirect to="/admin" />;
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
                        <h1>Authentification</h1>
                        <p className="text-muted">
                          Se connecter à votre compte
                        </p>
                        <InputGroup className="mb-3">
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              <i className="icon-user"></i>
                            </InputGroupText>
                          </InputGroupAddon>
                          <Input
                            value={this.state.email}
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
                          <Input
                            value={this.state.password}
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
                              onClick={this.login}
                              color="primary"
                              className="px-4"
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
                          {this.state.auth
                            ? this.state.error
                              ? this.state.error.message
                              : null
                            : null}
                        </p>
                      </Form>
                    </CardBody>
                  </Card>
                  {/** <Card
                    className="text-white bg-primary py-5 d-md-down-none"
                    style={{ width: "44%" }}
                  >

                  </Card> */}
                </CardGroup>
              </Col>
            </Row>
          </Container>
        </div>
      );
  }
  // }
}
export default Login;
