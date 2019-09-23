import React from "react";
import { Button } from "reactstrap";
import firebase from "../../config/config";
//import { Link } from 'react-router-dom';

class tirage extends React.Component {
  constructor() {
    super();
    this.state = {
      presentateurs: {},
      presentateur: ""
    };

    this.randomPerson = this.randomPerson.bind(this);
  }
  componentWillMount() {
    const ref = firebase.database().ref("Prensentateurs"); // wrong name :)
    ref.on("value", snapshot => {
      this.setState({
        presentateurs: snapshot.val()
      });
    });
  }

  randomPerson() {
    let presentateurs = this.state.presentateurs,
      keys = Object.keys(presentateurs),
      length = keys.length,
      randomNum = Math.floor(Math.random() * length),
      presentateur = Object.keys(presentateurs)[randomNum];

    this.setState({
      presentateur: presentateur
    });
  }

  render() {
    const presentateur = this.state.presentateur;

    return (
      <div>
        <h1>Le prochain Presentateur est : </h1>
        <br />
        <h1>{presentateur}</h1> <br />
        <Button onClick={this.randomPerson}> Tirage au sort </Button>
      </div>
    );
  }
}

export default tirage;
