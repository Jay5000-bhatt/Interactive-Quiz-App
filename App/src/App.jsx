import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store.jsx";

import Main from "./components/Main.jsx";
import Quiz from "./components/Quiz.jsx";
import Result from "./components/Result.jsx";
import { CheckUserExist } from "./helper/helper.jsx";
import "./App.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
  },
  {
    path: "/quiz",
    element: (
      <CheckUserExist>
        <Quiz />
      </CheckUserExist>
    ),
  },
  {
    path: "/result",
    element: (
      <CheckUserExist>
        <Result />
      </CheckUserExist>
    ),
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}

export default App;
