import React from "react";
import { Link } from 'react-router-dom';
import ToDoList from "./ToDoList";
import ToDoForm from "./ToDoForm";

const Home: React.FunctionComponent = () => {
    return (
        <>
            <h4>Home Page</h4>
            <ToDoForm />
            <ToDoList />
        </>
    );
};

export default Home;