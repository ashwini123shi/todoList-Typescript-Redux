import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';//router

//components
import TodoApp from "./components/TodoApp";
import { store } from "./imports";


export const App = () => (
  <>
    <Provider store={store}>
      <Router>
        <div className="App">
          <TodoApp />
        </div>
      </Router>
    </Provider>
  </>
)
