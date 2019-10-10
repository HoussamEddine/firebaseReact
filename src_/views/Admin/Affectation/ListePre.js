import React, { Component } from "react";

import firebase from "../../../config/config";

import { Input } from "reactstrap";

class ListePre extends Component {
  constructor(props) {
    super(props);
    //firebase.initializeApp(fire);
    this.state = {
      Presentateurs: []
    };
  }

  componentWillMount() {
    const ref = firebase.database().ref("Presentateurs");
    ref.on("value", snapshot => {
      let value = snapshot.val(),
        presentateurId;
      if (value.length) {
        presentateurId = value.length - 1;
      } else {
        for (let id in value) {
          presentateurId = id;
        }
      }
      this.setState({
        presentateurs: snapshot.val(),
        presentateurId: presentateurId
      });
    });
  }

  render() {
    let presentateursObj = this.state.presentateurs,
      presentateursArr = [];
    for (let pre in presentateursObj) {
      const name = presentateursObj[pre];
      presentateursArr.push(name);
    }

    let presentateur = presentateursArr.map(pres => (
      <option>
        {" "}
        {pres.Prenom} {pres.Nom}
      </option>
    ));

    return (
      <div>
        <Input type="select" name="select" id="select">
          {" "}
          {presentateur}{" "}
        </Input>
      </div>
    );
  }
}

export default ListePre;
