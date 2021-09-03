import React from "react";
import { Link } from 'react-router-dom';
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

const Home: React.FunctionComponent = (props: any) => {

    return (
        <>
            <h4>Home Page</h4>
            <ToDoForm
                props={props}
            />
            <ToDoList />
        </>
    );
};

export default Home;