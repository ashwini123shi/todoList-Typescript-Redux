import React from "react";
import { Provider } from "react-redux";
//import 'bootstrap/dist/css/bootstrap.min.css';

//components
import TodoApp from "./components/TodoApp";
import { store } from "./imports";


export const App = () => (
  <>
    <Provider store={store}>
      <div className="App">
        <TodoApp />
      </div>
    </Provider>
  </>
)
