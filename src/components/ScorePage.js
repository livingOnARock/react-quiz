import React from "react";
import "../App.css";

const ScorePage = ({ correctScore, resetState }) => {
  return (
    <div className="scorePage">
      <h1> You scored {correctScore * 20}%</h1>
      <button className="subBtn" onClick={resetState}>
        Reset Quiz
      </button>
    </div>
  );
};

export default ScorePage;
