import React, { ReactElement, useState, useEffect } from "react";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { addTodo, editTodoRow, setDuplicateItem } from "../redux/todoAction";
import { Alert } from "reactstrap";

//component

import ToDoReconfirm from "./ToDoReconfirm";
const ToDoForm = ({ initialValues: taskItem }): ReactElement => {
  type taskProps = {
    id: number,
    task: string,
    completed: Boolean
  }
  interface taskItem {
    task: String,
    priority: String,
    star: number
  }


  const [alertVisible, setAlertVisible] = useState(false);
  const onDismiss = () => setAlertVisible(false);
  const { list, duplicateItem } = useSelector(state => state.todos);
  const dispatch = useDispatch();

  const initialValues = {
    task: '',
    priority: '',
    star: 0
  }
  const [task, setTask] = useState({});
  //methods
  const handleVisible = (): void => {
    setAlertVisible(true)
    setTimeout(() => {
      setAlertVisible(false)
    }, 5000);
  }
  function onSubmit(fields: any, { setStatus, setSubmitting, resetForm }: any) {
    setStatus();
    if (isAddMode) {
      createUser(fields, setSubmitting, resetForm);
      console.log(fields);
    } else {
      updateUser(id, fields, setSubmitting);
      console.log(fields);
    }
  }

  function createUser(fields: any, setSubmitting: any, resetForm: any) {

    const duplicate = list.find((item: taskProps) => item.task === fields.task);
    if (!!duplicate) {
      dispatch(setDuplicateItem(duplicate.task));
      setSubmitting(false);
    } else {
      dispatch(addTodo(fields));
      resetForm(initialValues)
      handleVisible();
      setSubmitting(false);
    }
  }

  function updateUser(id: Number, fields: any, setSubmitting: any) {
    const duplicate = list.find((item: taskProps) => item.task === fields.task);
    if (!!duplicate) {
      dispatch(setDuplicateItem(duplicate.task));
      setSubmitting(false);
    } else {
      dispatch(editTodoRow(id, fields));
      // resetForm(initialValues)
      handleVisible();
      setSubmitting(false);
    }
  }


  const validationSchema = Yup.object().shape({
    task: Yup.string().required('Task is Required'),
    priority: Yup.string()
      .required('Priority is Required'),
    star: Yup.number().required('Star is Required')
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    // validate,
    validationSchema
  })
  const fetchitem = () => {
    return list.find((item: taskProps) => item.id === Number(props.props.match.params.id));
  };
  // console.log('formik.touched', submitedValues)
  useEffect(() => {
    console.log(props);
    console.log(isAddMode);

    console.log(props.props.match.params);
    if (!isAddMode) {
      //console.log('isAddMode', isAddMode);
      let item: taskProps = fetchitem();
      const fields = ['task', 'priority', 'star'];

      setTask(item);
      // fields.forEach(field => formik.setFieldValue(field, user[field], false));

    }

  }, []);


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

          <select name="priority"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.priority}
            className={'form-group'}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          {formik.touched.priority && formik.errors.priority ? (
            <div className='error'>{formik.errors.priority}</div>
          ) : null}
        </div>

        <div className='form-group'>
          <label htmlFor='star'>Star</label>
          <div className="acidjs-rating-stars">

            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-0" value="5" /><label for="group-1-0"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-1" value="4" /><label for="group-1-1"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-2" value="3" /><label for="group-1-2"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-3" value="2" /><label for="group-1-3"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-4" value="1" /><label for="group-1-4"></label>

          </div>
          {formik.touched.star && formik.errors.star ? (
            <div className='error'>{formik.errors.star}</div>
          ) : null}
        </div>

        <button className='btn btn-primary' type='submit'>Submit</button>
      </form>

      <Alert isOpen={alertVisible} fade={false} toggle={onDismiss} color="success">
        Task  added successfully
      </Alert>

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
