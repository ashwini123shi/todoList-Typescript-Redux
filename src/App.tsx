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


// import { Counter } from './Counter'

// export const App = () => {
//   return (
//     <>
//       <h1>React TypeScript Webpack Starter Template</h1>
//       <Counter />
//     </>
//   )
// }
