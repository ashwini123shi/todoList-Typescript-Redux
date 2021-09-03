import React, { useEffect } from "react";
import { useSelector } from "react-redux";
//component
import ToDoForm from "./ToDoForm";
interface taskItem {
    id: Number,
    task: String,
    completed: Boolean
}
const TodoDetails = (props: any): React.ReactElement => {
    const { list } = useSelector(state => state.todos);

    useEffect(() => {
        // console.log(props);
        //item = list.find((item: taskItem) => item.id === match.params.id);
        fetchitem();
    }, []);


    const fetchitem = () => {
        return list.find((item: taskItem) => item.id === Number(props.match.params.id));
    };
    let item: taskItem = fetchitem();
    return (<>
        <ToDoForm
            props={props}
        />
    </>);
};

export default TodoDetails;