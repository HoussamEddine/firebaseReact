import React from "react";
import { Button } from "reactstrap";
import firebase from "../../config/config";
import { CardBody, Table } from "reactstrap";
//import { Link } from 'react-router-dom';
import animation from "./animation.css"

class tirage extends React.Component {
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
    this.resetCards = this.resetCards.bind(this);
    this.timer = null;
    this.randomPerson = this.randomPerson.bind(this);
   
  }
  resetCards(currentTiles, currentScore) {
    this.setState({
      tiles: currentTiles,
      marked: false,
      firstCard: "",
      firstCardIndex: -1,
      score: currentScore
    });
    clearInterval(this.timer);
  }

  componentWillMount() {
    const ref = firebase.database().ref("Presentateurs");
    ref.on("value", snapshot => {
      this.setState({
        presentateurs: snapshot.val()
      });
    });
  }


  randomPerson() {
    let presentateursObj = this.state.presentateurs,
      keys = Object.keys(presentateursObj),
      length = keys.length,
      randomNum = Math.floor(Math.random() * length),
      presentateurId = Object.keys(presentateursObj)[randomNum],
      presentateur = presentateursObj[presentateurId];

    this.setState({
      presentateur: presentateur
    });
  }

  render() {
    const presentateur = this.state.presentateur;
   // this.timer = setTimeout(() => this.randomPerson(), 300);
   
    return (
      <div className={animation.tbody}>
        <CardBody style={{ width: "50%" }}>
          <Table responsive hover >
            <tbody >
              <td>{presentateur.Nom}</td>
              <td>{presentateur.Prenom}</td>
              <td>{presentateur.Email}</td>
            </tbody>
          </Table>
        </CardBody>
        {/* <h1>Le prochain Presentateur est : </h1> */}
        <br />
        {/* <h1>{presentateur}</h1> <br /> */}
        <Button onClick={this.randomPerson}>Tirage au sort</Button>
      </div>
    );
  }
}

export default tirage;
