import React, { Component } from "react";
import firebase from "../../../config/config";

class AddAffec extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Sujets: [],
      Sujet: "",
      Presentateur: "",
      Date: "",
      AffecId: 0,
      AffecAdded: false
    };
  }

  componentWillMount() {
    const ref = firebase.database().ref("Sujets_pr");
    ref.on("value", snapshot => {
      let value = snapshot.val(),
        AffecId;
      if (value.length) {
        AffecId = value.length - 1;
      } else {
        for (let id in value) {
          AffecId = id;
        }
      }
      this.setState({
        affectation: snapshot.val(),
        AffecId: AffecId
      });
    });
  }

  handelChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addAffec(e) {
    e.preventDefault();

    firebase
      .database()
      .ref("Sujets_pr/" + ++this.state.AffecId)
      .set({
        Sujet: this.state.Sujet,
        Presentateur: this.state.Presentateur,
        Date: this.state.Date,
        id: this.state.AffecId
      })
      .then(u => {
        this.setState({
          AffecAdded: true,
          message: "Ajouté avec succès"
        });
      })
      .catch(e => {
        console.log(e);
        this.setState({
          AffecAdded: false,
          message: "Erreur"
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
    return <div>affetc</div>;
  }
}

export default AddAffec;
