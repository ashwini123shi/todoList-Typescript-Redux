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
import UserList from "./AxiosApp/UserList";
import UserView from "./AxiosApp/UserView";
import UserEditContainer from "./AxiosApp/UserEditContainer";
import PostList from "./ReactQuery/PostList";
import Mutation from "./ReactQuery/Mutation";

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
              <Route path="/user-list" component={UserList} />
              <Route path="/view-user/:id" component={UserView} />
              <Route path="/edit-user/:id" component={UserEditContainer} />
              <Route path="/post-list" component={PostList} />
            </Switch>
          </div>
        </Row>
      </Container>
    </>
  );
};


export default TodoApp;
