import React, { ReactElement, useState } from "react";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from "react-redux";
import { addTodo, setDuplicateItem } from "../redux/todoAction";
import { Alert } from "reactstrap";
import '../css/formStyle.css'
//component
import ToDoReconfirm from "./ToDoReconfirm";
import FormCheckInput from "react-bootstrap/esm/FormCheckInput";
const ToDoForm = (): ReactElement => {
  type taskProps = {
    id: number,
    task: string,
    completed: Boolean,
  }
  const EmptyField: string = '';

  const [userInput, setUserInput] = useState(initialValues);
  const [alertVisible, setAlertVisible] = useState(false);
  const onDismiss = () => setAlertVisible(false);
  const { list, duplicateItem } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  //methods
  const handleChange = (e: any): void => {
    setUserInput(e.currentTarget.value);
  };
  const handleVisible = (): void => {
    setAlertVisible(true)
    setTimeout(() => {
      setAlertVisible(false)
    }, 5000);
  }
  // const handleSubmit = (e: any): void => {
  //   if (userInput !== "") {
  //     const duplicate = list.find((item: taskProps) => item.task === userInput);
  //     if (!!duplicate) {
  //       dispatch(setDuplicateItem(duplicate.task));
  //     } else {
  //       dispatch(addTodo(userInput));
  //       handleVisible();
  //     }
  //     setUserInput(EmptyField);
  //   }
  // };
  interface taskItem {
    task: String,
    priority: String,
    star: number
  }
  const initialValues = {
    task: '',
    priority: '',
    star: 0
  }

  const onSubmit = (taskItem: taskItem) => {
    console.log('Form data', taskItem)
    const submitedValues: taskItem = {
      task: taskItem.task,
      priority: taskItem.priority,
      star: taskItem.star
    };
    // submitedValues.task = taskItem.task;
    // console.log(submitedValues);
    //setUserInput(submitedValues);
    const duplicate = list.find((item: taskProps) => item.task === taskItem.task);
    if (!!duplicate) {

      dispatch(setDuplicateItem(duplicate.task));
    } else {
      dispatch(addTodo(taskItem));
      handleVisible();
    }
  }

  const validationSchema = Yup.object({
    task: Yup.string().required('Required'),
    priority: Yup.string()
      .required('Required'),
    star: Yup.number().required('Required')
  })

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema
  })

  // console.log('formik.touched', submitedValues)


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='task'>Task</label>
          <input
            type='text'
            id='task'
            name='task'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.task}
            disabled={!!duplicateItem}
          />
          {formik.touched.task && formik.errors.task ? (
            <div className='error'>{formik.errors.task}</div>
          ) : null}
        </div>

        <div className='form-group'>
          <label htmlFor='priority'>Priority</label>
          <input
            type='text'
            id='priority'
            name='priority'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.priority}
          />
          {formik.touched.priority && formik.errors.priority ? (
            <div className='error'>{formik.errors.priority}</div>
          ) : null}
        </div>

        <div className='form-group'>
          <label htmlFor='star'>Star</label>
          <input
            type='text'
            id='star'
            name='star'
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.star}
          />
          {formik.touched.star && formik.errors.star ? (
            <div className='error'>{formik.errors.star}</div>
          ) : null}
        </div>

        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>

      <Alert isOpen={alertVisible} fade={false} toggle={onDismiss} color="success">
        Task  added successfully
      </Alert>
      {/* <div className="card card-body my-3">
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
      </div> */}


      {/** load component if duplicate task is entered */}
      {!!duplicateItem && (
        <ToDoReconfirm
          {...formik.values}
        />
      )}
    </>
  );
};

export default ToDoForm;
