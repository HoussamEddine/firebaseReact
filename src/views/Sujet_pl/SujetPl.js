import React, { Component } from "react";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import getSujetsPl from "../../store/actions/getSujetPlanif";
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
    let dataObj = this.props.data.SujetsPl,
      dataArr = [];
    for (let pre in dataObj) {
      const name = dataObj[pre];

      name.Sujet && dataArr.push(name);
    }

    let eventsPre = dataArr.map((pres, i) => {
      return {
        id: i,
        title: pres.Sujet + " \n " + pres.Presentateur,
        start: pres.Date
      };
    });

    return (
      <div className="app" style={{ background: "white", padding: "10px" }}>
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          locale="fr"
          events={eventsPre}
        />
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
