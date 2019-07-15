import React, { Component } from "react";
import QuizQuestions from "../api/react-quiz-questions";
import ScorePage from "./ScorePage";
import "../App.css";

export default class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionnumber: 0,
      question: "",
      answerOptions: [],
      answer: "",
      questAmount: 5,
      correctScore: 0,
      index: 0,
      inProgress: false
    };
  }

  componentWillMount() {
    const currentQuiz = this.props.state.quiz;
    const quizGroup = Object.values(QuizQuestions[currentQuiz]);
    const currentQuestionGroup = quizGroup[this.state.index];
    const answerOptionsValues = Object.values(currentQuestionGroup.Options);
    const shuffleAnswerOptions = this.shuffleOptions(answerOptionsValues);
    const correctAnswer =
      currentQuestionGroup.Options[currentQuestionGroup.correctOption];
    this.setState({
      questionnumber: 1,
      question: currentQuestionGroup.question,
      answerOptions: shuffleAnswerOptions,
      answer: correctAnswer,
      questionAmount: quizGroup.length,
      inProgress: true
    });
  }

  shuffleOptions = ARRAY => {
    let arr = [];
    let array = ARRAY;
    let l = ARRAY.length;
    for (let i = 0; i < l; i++) {
      let lngth = array.length;
      let randomIndex = Math.floor(Math.random() * lngth);
      arr.push(array[randomIndex]);
      array.splice(randomIndex, 1);
      lngth = array.length;
    }
    return arr;
  };

  resetQuiz = () => {
    const currentQuiz = this.props.state.quiz;
    const quizGroup = Object.values(QuizQuestions[currentQuiz]);
    const currentQuestionGroup = quizGroup[0];
    const answerOptionsValues = Object.values(currentQuestionGroup.Options);
    const shuffleAnswerOptions = this.shuffleOptions(answerOptionsValues);
    const correctAnswer =
      currentQuestionGroup.Options[currentQuestionGroup.correctOption];
    this.setState({
      questionnumber: 1,
      question: currentQuestionGroup.question,
      answerOptions: shuffleAnswerOptions,
      answer: correctAnswer,
      questionAmount: quizGroup.length,
      index: 0
    });
  };

  runQuiz = e => {
    const currentQuiz = this.props.state.quiz;
    const quizGroup = Object.values(QuizQuestions[currentQuiz]);
    const nextQuestionGroup = quizGroup[this.state.index + 1];
    console.log(nextQuestionGroup);

    if (e.target.innerHTML === this.state.answer) {
      this.setState(prevState => ({
        correctScore: prevState.correctScore + 1
      }));
    }

    if (this.state.questionnumber < this.state.questAmount) {
      const answerOptionsValues = Object.values(nextQuestionGroup.Options);
      const correctAnswer =
        nextQuestionGroup.Options[nextQuestionGroup.correctOption];
      const shuffleAnswerOptions = this.shuffleOptions(answerOptionsValues);
      this.setState(prevState => ({
        questionnumber: prevState.questionnumber + 1,
        question: nextQuestionGroup.question,
        answerOptions: shuffleAnswerOptions,
        answer: correctAnswer,
        index: prevState.index + 1
      }));
    } else {
      this.setState({ inProgress: false });
    }
  };

  render() {
    return (
      <div className="quiz">
        {this.state.inProgress ? (
          <div className="quizContainer">
            <div className="questionInfo container">
              <h5>
                QUESTION {this.state.questionnumber} OF {this.state.questAmount}
              </h5>
              <h2>{this.state.question}</h2>
            </div>
            <div className="answerChoices ">
              <button
                onClick={this.runQuiz}
                name="choiceA"
                type="button"
                className="btn"
              >
                {this.state.answerOptions[0]}
              </button>
              <button
                onClick={this.runQuiz}
                name="choiceB"
                type="button"
                className="btn"
              >
                {this.state.answerOptions[1]}
              </button>
              <button
                onClick={this.runQuiz}
                name="choiceC"
                type="button"
                className="btn"
              >
                {this.state.answerOptions[2]}
              </button>
              <button
                onClick={this.runQuiz}
                name="choiceD"
                type="button"
                className="btn"
              >
                {this.state.answerOptions[3]}
              </button>
            </div>
            <div className="subButtons">
              <button
                onClick={this.resetQuiz}
                name="resetQuiz"
                type="button"
                className="subBtn"
              >
                Reset Quiz
              </button>
              <button
                onClick={this.props.resetState}
                name="mainMenu"
                type="button"
                className="subBtn"
              >
                Main Menu
              </button>
            </div>
          </div>
        ) : (
          <div>
            <ScorePage
              correctScore={this.state.correctScore}
              resetState={this.props.resetState}
            />
          </div>
        )}
      </div>
    );
  }
}
