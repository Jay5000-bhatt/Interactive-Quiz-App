import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { getServerData } from "../helper/helper.jsx";
import * as Action from "../redux/questions_reducer.jsx";

export const useFetchQuestions = () => {
  const dispatch = useDispatch();
  const [getData, setGetData] = useState({
    isLoading: false,
    apiData: [],
    serverError: null,
  });

  useEffect(() => {
    const fetchQuestions = async () => {
      setGetData((prev) => ({ ...prev, isLoading: true }));
      try {
        const data = await getServerData(`http://localhost:8080/api/questions`);
        const [{ questions, answers }] = data;
        if (questions.length > 0) {
          setGetData({
            isLoading: false,
            apiData: questions,
            serverError: null,
          });
          dispatch(Action.startExamAction({ question: questions, answers }));
        } else {
          throw new Error("No questions available");
        }
      } catch (error) {
        setGetData({
          isLoading: false,
          apiData: [],
          serverError: error.message,
        });
      }
    };

    fetchQuestions();
  }, [dispatch]);

  return [getData, setGetData];
};

// Action creator to move to the next question
export const moveNextQuestion = () => (dispatch) => {
  try {
    dispatch(Action.moveNextAction());
  } catch (error) {
    console.error("Error moving to next question:", error);
  }
};

//  Action creator to move to the previous question
export const movePrevQuestion = () => (dispatch) => {
  try {
    dispatch(Action.movePrevAction());
  } catch (error) {
    console.error("Error moving to previous question:", error);
  }
};
