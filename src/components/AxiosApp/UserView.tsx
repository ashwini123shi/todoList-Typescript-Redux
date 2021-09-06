import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

interface Props {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
const UserView = () => {

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
    return (
        <>
            {!!user && (
                <div className="card">
                    <img className="card-img-top card-img" src={user.avatar} alt={user.first_name}></img>
                    <div className="card-body">
                        <h5 className="card-title">{user.first_name} {user.last_name}</h5>
                        <p className="card-text">{user.email}</p>
                        <Link to={`/edit-user/${id}`}> Update</Link>

                    </div>
                </div>
            )}

        </>
    );
};

export default UserView;
