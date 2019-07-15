import React, { Component } from "react";
import QuizesList from "./components/QuizesList";
import Quiz from "./components/Quiz";
import "./App.css";

export default class App extends Component {
  state = {
    quiz: "",
    inProgress: false
  };

  render() {
    const setQuiz = e => {
      this.setState({ quiz: [e.target.name], inProgress: true });
    };
    const resetState = e => {
      this.setState({ quiz: "", inProgress: false });
    };
    const logState = e => {
      console.log(this.state.quiz);
    };
    return (
      <div className="app">
        {this.state.inProgress ? (
          <Quiz
            resetState={resetState}
            logState={logState}
            state={this.state}
          />
        ) : (
          <QuizesList setQuiz={setQuiz} />
        )}
      </div>
    );
  }
}
