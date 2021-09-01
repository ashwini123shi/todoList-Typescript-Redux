import React from "react";
import { useDispatch } from "react-redux";
import { addTodo, setDuplicateItem } from "../redux/todoAction";

const ToDoReconfirm = ({ taskItem }) => {
  const dispatch = useDispatch();
  const addDuplicateTask = () => {
    dispatch(addTodo(taskItem));
  };

  const handleDiscard = () => {
    dispatch(setDuplicateItem(false));
  };

  return (
    <div className="card card-body my-3">
      <h5>Dupicate task {taskItem}, Still you want to Add?</h5>
      <div className="row">
        <span
          onClick={() => { addDuplicateTask() }}
          className="mx-2 text-success cursor-ptr"
        >
          Add
        </span>

        <span onClick={() => { handleDiscard() }} className="mx-2 text-danger cursor-ptr">
          Discard
        </span>
      </div>
    </div>
  );
};
export default ToDoReconfirm;
