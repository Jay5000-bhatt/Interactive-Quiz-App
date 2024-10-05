import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { setUserId } from "../redux/result_reducer.jsx";
import "./Main.css";

export default function Main() {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  const startQuiz = () => {
    const userId = inputRef.current?.value.trim();
    if (userId) {
      dispatch(setUserId(userId));
    }
  };

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <ol>
        <li>You will be asked 10 questions one after another.</li>
        <li>10 points are awarded for each correct answer.</li>
        <li>
          Each question has three options. You can choose only one option.
        </li>
        <li>You can review and change your answers before the quiz ends.</li>
        <li>The result will be declared at the end of the quiz.</li>
      </ol>

      <form id="form" onSubmit={(e) => e.preventDefault()}>
        <input
          ref={inputRef}
          className="userid"
          type="text"
          placeholder="Username*"
          aria-label="Enter your username"
        />
      </form>

      <div className="start">
        <Link className="btn" to="quiz" onClick={startQuiz}>
          Start Quiz
        </Link>
      </div>
    </div>
  );
}
