
import React from "react";
import { Provider } from "react-redux";

//components
import TodoApp from "../components/TodoApp";
import { store } from "../imports";


const App = () => (
  <>
    <Provider store={store}>
      <div className="App">
        <TodoApp />
      </div>
    </Provider>

    hello from app
  </>
);
export default App;


{/*
export const App = () => {
  return (
    <>
      <h1>React TypeScript Webpack Starter Template</h1>
      
    </>
  )
}*/}
