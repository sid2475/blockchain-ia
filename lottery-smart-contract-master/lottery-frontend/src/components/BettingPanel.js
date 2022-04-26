import React from "react";

import NumberForm from "./NumberForm";

import "../css/betting-panel.css";

const BettingPanel = props => {
  const betPrice = "0.1 eth";

  let resultsAvailabilityData = <div></div>;
  if (props.areResultsAvailable !== null && props.areResultsAvailable) {
    resultsAvailabilityData = <div>Results are available!</div>;
  } else if (!props.areResultsAvailable) {
    resultsAvailabilityData = <div>Results are not available yet.</div>;
  }

  let resultData = <div></div>;
  if (props.areResultsAvailable && props.hasBetterWon) {
    resultData = (
      <div>You won! Your prize should be in your wallet already!</div>
    );
  } else if (props.areResultsAvailable) {
    resultData = <div>You lost. Try again!</div>;
  }

  return (
    <div className="main-frame">
      <NumberForm
        name0={props.name0}
        name1={props.name1}
        name2={props.name2}
        name3={props.name3}
        name4={props.name4}
        value0={props.value0}
        value1={props.value1}
        value2={props.value2}
        value3={props.value3}
        value4={props.value4}
        handleChange={props.handleChange}
      />
      <div className="bet-button" onClick={() => props.onClickBet()}>
        bet {" (" + betPrice + ")"}
      </div>
      <div className="result-button" onClick={() => props.onClickCheck()}>
        check results
      </div>
      <div className="result-data">
        {resultsAvailabilityData}
        {resultData}
      </div>
    </div>
  );
};

export default BettingPanel;
