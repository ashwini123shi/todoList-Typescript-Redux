import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { editTodo, setDuplicateEditItem } from "../redux/todoAction";


const ToDoEditReconfirm = (): React.ReactElement => {
  const dispatch = useDispatch();
  const { duplicateEditItem, duplicateEditItemId, duplicateItemIndex } = useSelector(state => state.todos);
  const handleDuplicateEdit = (): void => {
    dispatch(editTodo(duplicateEditItemId, duplicateEditItem, true));//send id,value to reducer
  };

  const handleEditDiscard = (): void => {
    dispatch(setDuplicateEditItem(false));
  };

  return (
    <div className="card card-body my-3">
      <h5>
        Dupicate task {duplicateEditItem} at position {duplicateItemIndex} Still you want to Update?
      </h5>
      <div className="row">
        <span
          onClick={() => handleDuplicateEdit()}
          className="mx-2 text-success cursor-ptr"
        >
          Add
        </span>

        <span
          onClick={() => handleEditDiscard()}
          className="mx-2 text-danger cursor-ptr"
        >
          Discard
        </span>
      </div>
    </div>
  );
};
export default ToDoEditReconfirm;
