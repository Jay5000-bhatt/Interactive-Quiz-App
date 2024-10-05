import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Result.css";
import ResultTable from "./ResultTable.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  attemptsNumber,
  earnPointsNumber,
  flagResult,
} from "../helper/helper";
import { resetAllAction } from "../redux/questions_reducer.jsx";
import { resetResultAction } from "../redux/result_reducer.jsx";
import { usePublishResult } from "../hooks/setResult.jsx";

export default function Result() {
  const dispatch = useDispatch();
  const {
    questions: { queue, answers },
    result: { result, userId },
  } = useSelector((state) => state);

  const totalPoints = queue.length * 10;
  const attempts = attemptsNumber(result);
  const earnPoints = earnPointsNumber(result, answers, 10);
  const flag = flagResult(totalPoints, earnPoints);

  /** Store user result */
  usePublishResult({
    result,
    username: userId,
    attempts,
    points: earnPoints,
    achieved: flag ? "Passed" : "Failed",
  });

  const handleRestart = () => {
    dispatch(resetAllAction());
    dispatch(resetResultAction());
  };

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      <div className="result flex-center">
        <div className="flex">
          <span>Username:</span>
          <span className="bold">{userId || "N/A"}</span>
        </div>
        <div className="flex">
          <span>Total Quiz Points:</span>
          <span className="bold">{totalPoints}</span>
        </div>
        <div className="flex">
          <span>Total Questions:</span>
          <span className="bold">{queue.length}</span>
        </div>
        <div className="flex">
          <span>Total Attempts:</span>
          <span className="bold">{attempts}</span>
        </div>
        <div className="flex">
          <span>Total Earned Points:</span>
          <span className="bold">{earnPoints}</span>
        </div>
        <div className="flex">
          <span>Quiz Result:</span>
          <span
            style={{ color: flag ? "#2aff95" : "#ff2a66" }}
            className="bold"
          >
            {flag ? "Passed" : "Failed"}
          </span>
        </div>
      </div>

      <div className="start">
        <Link className="btn" to="/" onClick={handleRestart}>
          Restart
        </Link>
      </div>

      <div className="container">
        {/* Result table */}
        <ResultTable />
      </div>
    </div>
  );
}
