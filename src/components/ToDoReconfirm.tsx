import React from "react";
import { useDispatch } from "react-redux";
import { addTodo, setDuplicateItem } from "../redux/todoAction";
interface taskItem {
  task: String,
  priority: String,
  star: number
}

const ToDoReconfirm = ({ task, priority, star }: any): React.ReactElement => {
  const dispatch = useDispatch();
  const addDuplicateTask = () => {
    dispatch(addTodo({ task, priority, star }));
  };

  const handleDiscard = () => {
    dispatch(setDuplicateItem(false));
  };

  return (
    <div className="card card-body my-3">
      <h5>Dupicate task {task}, Still you want to Add?</h5>
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
