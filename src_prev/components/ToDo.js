import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { editTodo, deleteTodo, toggleTodo, setDuplicateItem} from "../redux/todoAction";
interface Props {
  id:Number,
  task:String,
  completed:Boolean
}
const ToDo = ({ id, task, completed }:Props) => {
  const dispatch = useDispatch();
  const [isShown, setIsShown] = useState(true);

  const handleDelete = (id:Number) => {
    dispatch(deleteTodo(id));
  };

  //toggle status of item
  const handleToggle = (id) => {
    dispatch(toggleTodo(id));
  };

  const handleEdit = (e) => {
    setIsShown(!isShown);
    dispatch(editTodo(id,e.currentTarget.value));
  };

  const styled = {
    textDecoration: completed ? "line-through" : "none",
  };
  

  return (
    <>
      <div className="textBlock">
        {isShown && <div style={styled} onClick={() => setIsShown(!isShown)}>{task}</div>}
        {!isShown && (
          <input
            type="text"
            onMouseOver={(e) => (e.target.style.fontStyle = "italic")}
            onMouseLeave={(e) => (e.target.style.fontStyle = "normal")}
            onBlur={handleEdit}
            defaultValue={task}
            id={id}
          />
        )}
      </div>

      <div className="actionBlock">
        <span className="mx-2 text-success cursor-ptr">
          <i
            id={id}
            name="todoStatus"
            value={id}
            onClick={(e) => handleToggle(e.currentTarget.id)}
            className="fa fa-check"
            aria-hidden="true"
          ></i>
        </span>
        <span className="mx-2 text-danger cursor-ptr">
          <i
            id={id}
            name="todoDelete"
            value={id}
            onClick={(e) => handleDelete(e.currentTarget.id)}
            className="fa fa-trash"
            aria-hidden="true"
          ></i>
        </span>
      </div>
    </>
  );
};

export default ToDo;