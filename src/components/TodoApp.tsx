import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
//css
import "bootstrap/dist/css/bootstrap.min.css";
import "../index.css";
//components
import Header from "./Header";
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

const TodoApp = (): React.ReactElement => {

  return (
    <Container>
      <Row>
        <div className="col-10 mx-auto col-md-8 mt-4">
          <Header />
          <ToDoForm />
          <ToDoList />
        </div>
      </Row>
    </Container>
  );
};

export default TodoApp;
