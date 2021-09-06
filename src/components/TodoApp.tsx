import React from "react";
import { Switch, Route } from 'react-router-dom';//router


import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//css
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
//components
import Home from "../components/Home";
import Header from "../components/Header";

import TodoDetails from "./ToDo/TodoDetails";
import ToDoFormContainer from "./ToDo/ToDoFormContainer";

const TodoApp = (): React.ReactElement => {

  return (
    <>
      <Header />
      <Container>
        <Row>
          <div className="col-10 mx-auto col-md-8 mt-4">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/todo/:id" component={TodoDetails} />
              <Route path="/add-item" component={ToDoFormContainer} />
            </Switch>
          </div>
        </Row>
      </Container>
    </>
  );
};


export default TodoApp;
