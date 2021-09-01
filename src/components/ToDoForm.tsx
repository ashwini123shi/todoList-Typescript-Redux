import React, { ReactElement, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setDuplicateItem } from "../redux/todoAction";
import { Alert } from "reactstrap"
//component
import ToDoReconfirm from "./ToDoReconfirm";
const ToDoForm = (): ReactElement => {
  type taskProps = {
    id: number,
    task: string,
    completed: Boolean,
  }
  const EmptyField: string = 'fieldId';

  const [userInput, setUserInput] = useState(EmptyField);
  const [alertVisible, setAlertVisible] = useState(false);


  const onDismiss = () => setAlertVisible(false);
  const { list, duplicateItem } = useSelector(state => state.todos);
  const dispatch = useDispatch();
  const handleChange = (e: any) => {
    setUserInput(e.currentTarget.value);
  };
  const handleVisible = () => {
    setAlertVisible(true)
    setTimeout(() => {
      setAlertVisible(false)
    }, 5000);
  }
  const handleSubmit = (e: any) => {
    if (userInput !== "") {
      const duplicate = list.find((item: taskProps) => item.task === userInput);
      if (!!duplicate) {
        dispatch(setDuplicateItem(duplicate.task));
      } else {
        dispatch(addTodo(userInput));
        handleVisible();
      }
      setUserInput(EmptyField);
    }
  };
  return (
    <>

      <Alert isOpen={alertVisible} fade={false} toggle={onDismiss} color="success">
        Task added successfully
      </Alert>


      <div className="card card-body my-3">
        <div className="input-group">
          <input
            value={userInput || ''}
            type="text"
            onChange={handleChange}
            placeholder="Enter task..."
            disabled={!!duplicateItem}
          />
          <div className="input-group-postpend">
            <div
              onClick={handleSubmit}
              className="input-group-text bg-primary text-white"
            >
              <i className="fa fa-plus "></i>
            </div>
          </div>
        </div>
      </div>
      {/** load component if duplicate task is entered */}
      {!!duplicateItem && (
        <ToDoReconfirm
          taskItem={duplicateItem}
        />
      )}
    </>
  );
};

export default ToDoForm;
