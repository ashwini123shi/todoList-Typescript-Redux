import { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Field, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import { FormControl } from "react-bootstrap";

interface userProps {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
interface Props { userObject?: userProps; isAddMode: boolean; actionCompleted: boolean; handleSubmit: (fields: any) => void; }
// Validation rules for password fields
const UserEditSchema = Yup.object().shape({
    first_name: Yup.string().required('Required'),
    last_name: Yup.string().required('Required')

});
const UserEditForm = ({ userObject, isAddMode, actionCompleted, handleSubmit }: Props): ReactElement => {

    let { id } = useParams();
    console.log("param", id);
    const [user, setuser] = useState({ "id": 0, "email": "", "first_name": "", "last_name": "", "avatar": "" });
    const initialValues = {
        first_name: userObject?.first_name || '', last_name: userObject?.last_name || ''
    };
    return (
        <>

            <Formik
                initialValues={initialValues}
                validationSchema={UserEditSchema}
                onSubmit={(values, actions) => {
                    setTimeout(() => {
                        alert(JSON.stringify(values, null, 2));
                        actions.setSubmitting(false);
                    }, 1000);
                }}
            >
                {formik => (
                    <form autoComplete="off" onSubmit={formik.handleSubmit}>

                        <div className='form-group'>
                            <label htmlFor='first_name'>First Name</label>
                            <input
                                className={'form-control'}
                                type='text'
                                id='first_name'
                                name='first_name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.first_name.toString()}
                            />
                            {formik.touched.first_name && formik.errors.first_name ? (
                                <div className='error'>{formik.errors.first_name}</div>
                            ) : null}
                        </div>

                        <div className='form-group'>
                            <label htmlFor='last_name'>Last Name</label>
                            <input
                                className={'form-control'}
                                type='text'
                                id='last_name'
                                name='last_name'
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.last_name.toString()}
                            />
                            {formik.touched.last_name && formik.errors.last_name ? (
                                <div className='error'>{formik.errors.last_name}</div>
                            ) : null}
                        </div>

                        <button type="submit">Submit</button>
                    </form>
                )}
            </Formik>


        </>
    );
};

export default UserEditForm;
