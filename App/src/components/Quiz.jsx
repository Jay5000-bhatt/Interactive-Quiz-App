import React, { useEffect, useState } from "react";
import Questions from "./Questions.jsx";
import { moveNextQuestion, movePrevQuestion } from "../hooks/FetchQuestion.jsx";
import { PushAnswer } from "../hooks/setResult.jsx";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Quiz() {
  const [checked, setChecked] = useState(undefined);

  const result = useSelector((state) => state.result.result);
  const { queue, trace } = useSelector((state) => state.questions);
  const dispatch = useDispatch();

  // Next button event handler
  const handleNext = () => {
    if (trace < queue.length) {
      //  Increase the trace value by one
      dispatch(moveNextQuestion());

      // Insert a new result in the array if not already present
      if (result.length <= trace) {
        dispatch(PushAnswer(checked));
      }
    }
    // Reset the checked state
    setChecked(undefined);
  };

  // Prev button event handler
  const handlePrev = () => {
    if (trace > 0) {
      //  Decrease the trace value by one
      dispatch(movePrevQuestion());
    }
  };

  //  Handler for when an answer is checked
  const handleChecked = (index) => {
    setChecked(index);
  };

  // Navigate to the result page if the quiz is finished
  if (result.length && result.length >= queue.length) {
    return <Navigate to="/result" replace={true} />;
  }

  return (
    <div className="container">
      <h1 className="title text-light">Quiz Application</h1>

      {/* Display questions */}
      <Questions onChecked={handleChecked} />

      <div className="grid">
        {trace > 0 && (
          <button className="btn prev" onClick={handlePrev}>
            Prev
          </button>
        )}
        <button className="btn next" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
}
