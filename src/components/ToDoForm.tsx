import React, { ReactElement, useState, useEffect } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { Alert } from "reactstrap";
import { useSelector } from "react-redux";
//import '../css/formStyle.css'
//component
import ToDoReconfirm from "./ToDoReconfirm";
interface taskItem {
  task: String,
  priority: String,
  star: number
}
const ToDoForm = ({ initialValues, isAddMode, actionCompleted, handleSubmit }: any): ReactElement => {
  type taskProps = {
    id: number,
    task: string,
    completed: Boolean
  }


  const { duplicateItem } = useSelector(state => state.todos);

  function onSubmit(fields: any, { setStatus, setSubmitting, resetForm }: any) {
    handleSubmit(fields)
    setSubmitting(false);
    console.log(initialValues);
    if (isAddMode) {
      resetForm(initialValues);
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

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='task'>Task</label>
          <input
            className={'form-control'}
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
            className={'form-control'}>
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
          <div className="acidjs-rating-stars form-control">

            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-0" value="5" /><label htmlFor="group-1-0"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-1" value="4" /><label htmlFor="group-1-1"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-2" value="3" /><label htmlFor="group-1-2"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-3" value="2" /><label htmlFor="group-1-3"></label>
            <input type="radio" name="star" onBlur={formik.handleBlur} onChange={formik.handleChange} id="group-1-4" value="1" /><label htmlFor="group-1-4"></label>

          </div>
          {formik.touched.star && formik.errors.star ? (
            <div className='error'>{formik.errors.star}</div>
          ) : null}
        </div>

        <button className='btn btn-primary' type='submit'>{isAddMode ? 'Submit' : 'Update'}</button>
      </form>

      <Alert isOpen={actionCompleted && isAddMode} fade={false} color="success" className="mt-3">
        Todo  details saved successfully
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
