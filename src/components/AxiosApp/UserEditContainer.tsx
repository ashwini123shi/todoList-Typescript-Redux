import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import UserEditForm from "./UserEditForm";

interface Props {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
const UserEditContainer = () => {

    let { id } = useParams();
    console.log("param", id);
    const [user, setuser] = useState({ "id": 0, "email": "", "first_name": "", "last_name": "", "avatar": "" });
    useEffect(() => {
        axios.get(`https://reqres.in/api/users/${id}`)
            .then(response => {
                //console.log(response.data);
                setuser(response.data.data);
                console.log(user);
            })
            .catch(error => {
                console.log(error)
            })
    });
    function handleSubmit(fields: any): Boolean {

        console.log(fields);
        return false;
    }
    return (
        <>
            {!!user && (
                <UserEditForm
                    user={user}
                    isAddMode={false}
                    actionCompleted={false}
                    handleSubmit={handleSubmit}
                />
            )}

        </>
    );
};

export default UserEditContainer;
