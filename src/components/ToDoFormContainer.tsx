import React, { ReactElement, useState, useEffect } from "react";
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup'
import { DefaultRootState, useDispatch, useSelector } from "react-redux";
import { addTodo, editTodoRow, setDuplicateItem } from "../redux/todoAction";
import { Alert } from "reactstrap";

//component
import ToDoForm from "./ToDoForm";
import ToDoReconfirm from "./ToDoReconfirm";
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

    var initialValues = {
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
    function handleSubmit(fields: any) {

        if (isAddMode) {
            createUser(fields);
            console.log(fields);
        } else {
            updateUser(id, fields);
            console.log(fields);
        }
    }

    function createUser(fields: any) {

        const duplicate = list.find((item: taskProps) => item.task === fields.task);
        if (!!duplicate) {
            dispatch(setDuplicateItem(duplicate.task));
            // setSubmitting(false);
        } else {
            dispatch(addTodo(fields));
            // resetForm(initialValues)
            handleVisible();
            setTimeout(() => {
                setAlertVisible(false)
            }, 5000);
            // setSubmitting(false);
        }
    }

    function updateUser(id: Number, fields: any) {
        const duplicate = list.find((item: taskProps) => item.task === fields.task);
        if (!!duplicate) {
            dispatch(setDuplicateItem(duplicate.task));
            // setSubmitting(false);
        } else {
            dispatch(editTodoRow(id, fields));
            // resetForm(initialValues)
            handleVisible();
            //  setSubmitting(false);
        }
    }

    const fetchitem = () => {
        if (isAddMode) {
            initialValues = {
                task: 'ffff',
                priority: '',
                star: 4
            }
            return initialValues;
        } else {
            initialValues = {
                task: 'ttttt',
                priority: '',
                star: 4
            }
            //return list.find((item: taskProps) => item.id === Number(props.props.match.params.id));
        }

    };
    // console.log('formik.touched', submitedValues)
    useEffect(() => {
        console.log(props);
        console.log(isAddMode);

        console.log(props.props.match.params);
        if (!isAddMode) {
            //console.log('isAddMode', isAddMode);
            fetchitem();
            const fields = ['task', 'priority', 'star'];

            setTask(list.find((item: taskProps) => item.id === Number(props.props.match.params.id)));
            // fields.forEach(field => formik.setFieldValue(field, user[field], false));

        }

    }, []);


    return (
        <>
            <ToDoForm
                initialValues={initialValues}
                ///initialValues={() => fetchitem()}
                isAddMode={isAddMode}
                actionCompleted={alertVisible}
                handleSubmit={handleSubmit} />
        </>
    );
};

export default ToDoFormContainer;
