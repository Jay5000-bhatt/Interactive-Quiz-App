import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFetchQuestions } from "../hooks/FetchQuestion.jsx";
import { updateResult } from "../hooks/setResult.jsx";

export default function Questions({ onChecked }) {
  const [checked, setChecked] = useState(undefined);
  const { trace } = useSelector((state) => state.questions);
  const result = useSelector((state) => state.result.result);
  const [data, setData] = useFetchQuestions(); // Adjusted hook usage

  // Destructure with default values
  const { isLoading = false, apiData = [], serverError = null } = data || {};

  const questions = useSelector(
    (state) => state.questions.queue[state.questions.trace]
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (checked !== undefined) {
      dispatch(updateResult({ trace, checked }));
    }
  }, [checked]);

  function onSelect(i) {
    onChecked(i);
    setChecked(i);
    dispatch(updateResult({ trace, checked }));
  }

  if (isLoading) return <h3 className="text-light">Loading...</h3>;
  if (serverError) return <h3 className="text-light">{serverError}</h3>;

  return (
    <div className="questions">
      <h2 className="text-light">{questions?.question}</h2>

      <ul key={questions?.id}>
        {questions?.options.map((q, i) => (
          <li key={i}>
            <input
              type="radio"
              value={false}
              name="options"
              id={`q${i}-option`}
              onChange={() => onSelect(i)}
            />

            <label className="text-primary" htmlFor={`q${i}-option`}>
              {q}
            </label>
            <div
              className={`check ${result[trace] === i ? "checked" : ""}`}
            ></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
