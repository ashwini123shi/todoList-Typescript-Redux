import React from "react";
import { Link } from 'react-router-dom';
import ToDoList from "./ToDoList";
import ToDoFormContainer from "./ToDoFormContainer";

const Home: React.FunctionComponent = (props: any) => {

    return (
        <>
            <h4>Home Page</h4>
            <ToDoFormContainer
                props={props}
            />
            <ToDoList />
        </>
    );
};

export default Home;