import React, { ReactElement, useState, useEffect } from "react";
import { useFormik, Formik, Field, Form, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { addTodo, setDuplicateItem } from "../redux/todoAction";
import { Alert } from "reactstrap";
import { useParams } from "react-router-dom";
//service
import { getTaskById } from '../services/taskService';
import '../css/formStyle.css'
//component
import ToDoForm from "./ToDoForm";
const ToDoFormContainer = (props: any): ReactElement => {
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

    const { id } = props.props.match.params ? props.props.match.params : 0;


    const isAddMode = !id;

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
    // const onSubmit = (taskItem: taskItem) => {

    //   //console.log('Form data', taskItem)
    //   const duplicate = list.find((item: taskProps) => item.task === taskItem.task);
    //   if (!!duplicate) {
    //     dispatch(setDuplicateItem(duplicate.task));
    //   } else {
    //     dispatch(addTodo(taskItem));
    //     handleVisible();
    //   }
    // }

    function onSubmit(fields: any, { setStatus, setSubmitting, resetForm }: any) {
        setStatus();
        if (isAddMode) {
            createUser(fields, setSubmitting, resetForm);
            console.log(fields);
        } else {
            //updateUser(id, fields, setSubmitting);
            console.log(fields);
        }
    }

    function createUser(fields: any, setSubmitting: any, resetForm: any) {
        // userService.create(fields)
        //   .then(() => {
        //     alertService.success('User added', { keepAfterRouteChange: true });
        //     history.push('.');
        //   })
        //   .catch(() => {
        //     setSubmitting(false);
        //     alertService.error(error);
        //   });
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
            {/* <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, touched, isSubmitting, setFieldValue }) => {
          //  const [user, setUser] = useState({});


          useEffect(() => {
            if (!isAddMode) {
              // get user and set form fields

              const fields = ['task', 'priority', 'star'];
              // console.log(getTaskById(id));
              console.log(id);
              //setFieldValue('task', 'item.task', false)
              //  fields.forEach(field => setFieldValue(field, `${item.field}`, false));
              // fields.forEach(field => console.log(`item.${field}`));
              // fields.forEach(field => console.log(field));

              // userService.getById(id).then(user => {
              //   const fields = ['title', 'firstName', 'lastName', 'email', 'role'];
              //   fields.forEach(field => setFieldValue(field, user[field], false));
              //   setUser(user);
              // });
            }
          }, []);

          return (
            <Form>
              <h1>{isAddMode ? 'Add User' : 'Edit User'}</h1>
              <div className="form-row">
                <div className="form-group col-7">
                  <label>Task</label>
                  <Field name="task" autoComplete="false" type="text" className={'form-control' + (errors.task && touched.task ? ' is-invalid' : '')} />
                  <ErrorMessage name="task" component="div" className="invalid-feedback" />
                </div>
                <div className="form-group col-7">
                  <label>Priority</label>
                  <Field name="priority" type="text" className={'form-control' + (errors.priority && touched.priority ? ' is-invalid' : '')} />
                  <ErrorMessage name="priority" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-7">
                  <label>Star</label>
                  <Field name="star" type="text" className={'form-control' + (errors.star && touched.star ? ' is-invalid' : '')} />
                  <ErrorMessage name="star" component="div" className="invalid-feedback" />
                </div>
              </div>
              <div className="form-group">
                <button type="submit" disabled={isSubmitting} className="btn btn-primary">
                  {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                  Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
              </div>
            </Form>
          );
        }}
      </Formik> */}
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

            {/** load component if duplicate task is entered */}
            {!!duplicateItem && (
                <ToDoReconfirm
                    {...formik.values}
                />
            )}
        </>
    );
};

export default ToDoFormContainer;
