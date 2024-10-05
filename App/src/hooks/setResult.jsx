import { postServerData } from "../helper/helper.jsx";
import * as Action from "../redux/result_reducer.jsx";

export const PushAnswer = (result) => async (dispatch) => {
  try {
    await dispatch(Action.pushResultAction(result));
  } catch (error) {
    console.log(error);
  }
};

export const updateResult = (index) => async (dispatch) => {
  try {
    dispatch(Action.updateResultAction(index));
  } catch (error) {
    console.log(error);
  }
};

/** Insert user data */
export const usePublishResult = (resultData) => {
  const { result, username } = resultData;
  (async () => {
    try {
      // Check if result is an empty array and username is missing
      if (result.length === 0 || !username) throw new Error("Couldn't get Result");
      
      await postServerData(
        `http://localhost:8080/api/result`,
        resultData,
        (data) => data
      );
    } catch (error) {
      console.log(error);
    }
  })();
};
