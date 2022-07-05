import React, { Component } from "react";
import "./Spinner.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faSpinner);

class Spinner extends Component {
  render() {
    return (
      <div className="spinner-wrapper">
        <div className="heading">
          <h2>Loading ....</h2>
        </div>
        <br />
        <FontAwesomeIcon icon="spinner" size="6x" spin />
      </div>
    );
  }
}

export default Spinner;
