import React,{Component} from 'react';
import { Card, CardBody, CardHeader, Col, Row, Table ,CardFooter } from "reactstrap";
import * as firebase from 'firebase';

class SujetPl extends Component{
    constructor(props) {
        super(props);
        this.state = {
          Sujet: "",
          Presentateur: "",
          Date: "",
          presentateursId: 0,
          presentateurs: {}
        };
      }
    
      componentWillMount() {
        const ref = firebase.database().ref("Sujets_pr");
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
    
        let presentateur = presentateursArr.map((pres, i) => {
          return (
            <tr key={i}>
              <td>{pres.Sujet}</td>
              <td>{pres.Presentateur}</td>
              <td>{pres.Date}</td>
    
            </tr>
          );
        });
    
    
        return (
          <div className="app">
    
    
    
              <div>
                <Col>
                <Card>
                <CardHeader>
                      <strong>Sujet</strong>
                    </CardHeader>
                <CardBody>
                  <Table responsive hover>
                    <thead>
                      <th>Sujet</th>
                      <th>Présentateur</th>
                      <th>Date</th>
                    </thead>
                   <tbody>
                      {presentateur}
                    </tbody>
                  </Table>
                </CardBody>
                <CardFooter></CardFooter>
               </Card>
               </Col>
              </div>
            </div>
         
        );
      }
}
export default SujetPl ;