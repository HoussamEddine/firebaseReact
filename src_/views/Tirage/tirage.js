import React from "react";
import { Button } from "reactstrap";
import firebase from "../../config/config";
import { CardBody, Table } from "reactstrap";
//import { Link } from 'react-router-dom';

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

    this.randomPerson = this.randomPerson.bind(this);
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

    return (
      <div>
        <CardBody style={{ width: "50%" }}>
          <Table responsive hover>
            <thead>
              <tr>
                <th scope="col">Nom</th>
                <th scope="col">Prenom</th>
                <th scope="col">Email</th>
              </tr>
            </thead>

            <tbody>
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
