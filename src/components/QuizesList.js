import React from "react";
import "../App.css";

const QuizesList = ({ setQuiz }) => {
  return (
    <div className="quizList">
      <h1>Choose a quiz to test your knowledge</h1>
      <div className="listOfQuizzes">
        <button name="reactQuiz" className="btn" onClick={setQuiz}>
          React Quiz
        </button>
        <button name="stateCapitalQuiz" className="btn" onClick={setQuiz}>
          US State Capitals
        </button>
        <button name="countryCapitalQuiz" className="btn" onClick={setQuiz}>
          World Country Capitals
        </button>
      </div>
    </div>
  );
};

export default QuizesList;
