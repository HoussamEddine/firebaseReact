import React from "react";
import { Button } from "reactstrap";

import { Card, CardBody, CardHeader, Col, CardFooter } from "reactstrap";

import getPresentateurs from "../../store/actions/getPresentateur";
import { connect } from "react-redux";

class Tirage extends React.Component {
  constructor() {
    super();
    this.state = {
      presentateurs: {
        Nom: "",
        Prenom: "",
        Email: ""
      },
      presentateur: ""
    };
  
    this.timer = null;
    this.randomPerson = this.randomPerson.bind(this);
  }

  componentWillMount() {
    this.props.getPresentateurs();
  }

  randomPerson() {
    let presentateursObj = this.props.data.Presentateurs,
      keys = Object.keys(presentateursObj),
      length = keys.length,
      randomNum = Math.floor(Math.random() * length),
      presentateurId = Object.keys(presentateursObj)[randomNum],
      presentateur = presentateursObj[presentateurId];
    if (presentateur && presentateur.Email) {
      this.setState({
        presentateur: presentateur
      });
    }

    this.timer = setTimeout(() => this.randomPerson(), 90);
    setTimeout(() => clearTimeout(this.timer), 6000);
  }

  render() {
    const presentateur = this.state.presentateur;

    return (
      <div className="app">
        <div>
          <Col>
            <Card>
              <CardHeader></CardHeader>
              <CardBody>
                <center>
                  <h1 style={{ width: "80%" }}>
                    {presentateur.Nom} {presentateur.Prenom}
                  </h1>
                </center>
                <center>
                  <Button
                    onClick={this.randomPerson}
                    className="btn btn-lg btn-pill btn-danger"
                  >
                    Commencer
                  </Button>
                </center>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
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
    getPresentateurs: () => dispatch(getPresentateurs())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Tirage);
