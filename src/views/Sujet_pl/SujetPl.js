import React, { Component } from "react";

import firebase from "../../config/config";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import getSujetsPl from "../../store/actions/sujetsPl";
import { connect } from "react-redux";

class SujetPl extends Component {
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
    this.props.getSujetsPl();
  }

  render() {
    let presentateursObj = this.props.data.SujetsPl,
      presentateursArr = [];
    for (let pre in presentateursObj) {
      const name = presentateursObj[pre];
      presentateursArr.push(name);
    }
    console.log(presentateursArr);
    let eventsPre = presentateursArr.map((pres, i) => {
      return {
        id: i,
        title: pres.Sujet + " \n " + pres.Presentateur,
        start: pres.Date
      };
    });
    // let presentateur = presentateursArr.map((pres, i) => {
    //   return (
    //     <tr key={i}>
    //       <td>{pres.Sujet}</td>
    //       <td>{pres.Presentateur}</td>
    //       <td>{pres.Date}</td>
    //     </tr>
    //   );
    // });

    return (
      <div className="app" style={{ background: "white", padding: "10px" }}>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          locale="fr"
          events={eventsPre}
        />

        {/* <div>
          <Col>
            <Card>
              <CardHeader></CardHeader>
              <CardBody>
                <Table responsive hover>
                  <thead>
                    <th>Sujet</th>
                    <th>Présentateur</th>
                    <th>Date</th>
                  </thead>
                  <tbody>{presentateur}</tbody>
                </Table>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
        </div> */}
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
    getSujetsPl: () => dispatch(getSujetsPl())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SujetPl);
