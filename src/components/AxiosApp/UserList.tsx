import React, { useEffect, useState } from "react";
import { getUserListData } from './DataLayer/DatalayerUtilities';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import axios from "axios";
//components
import User from "./User";

type Data = {
    id: number;
    avatar: string;
    email: string;
    first_name: string;
    last_name: string;
};

type Support = {
    text: string;
    url: string;
};

type Users = {
    data: Data[];
    page: number;
    per_page: number;
    support: Support;
    total: number;
    total_pages: number;
};
interface ListProps {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

const fetchUsers = async (): Promise<Users> => {
    const response = await fetch('https://reqres.in/api/users');
    if (!response.ok) {
        throw new Error('Something went wrong!');
    }
    return response.json();
};

const addUser = async (user: {
    first_name: string;
    last_name: string;
}): Promise<Data> => {
    const response = await fetch('https://reqres.in/api/users', {
        method: 'POST',
        body: JSON.stringify({
            first_name: user.first_name,
            last_name: user.last_name
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    });

    if (!response.ok) {
        throw new Error('Something went wrong!');
    }

    return response.json();
};

const UserList = (props: any) => {
    // const [userId, setuserId] = React.useState(-1);
    // const [postId, setPostId] = React.useState(-1);
    // const [list, setList] = useState([]);
    // useEffect(() => {
    //     // handlerUserList();

    //     axios.get("https://reqres.in/api/users?page=2")
    //         .then(response => {
    //             //console.log(response.data);
    //             setList(response.data.data);
    //             console.log(list);
    //         })
    //         .catch(error => {
    //             console.log(error)
    //         })

    // });
    // const handlerUserList = async () => {
    //     const responseData = await getUserListData();
    //     console.log('list', responseData.data)
    //     setList(responseData.data);

    // }

    // Call the useQueryClient hook
    const queryClient = useQueryClient();
    // Grab all users
    const { data: users, isLoading, error } = useQuery<Users, ErrorConstructor>(
        'users',
        fetchUsers
    );

    // Create a mutation for adding a user
    const { mutateAsync, isLoading: isAddingUser, error: addError } = useMutation(
        addUser
    );

    const handleAddUser = async () => {
        const newUser = await mutateAsync({
            first_name: 'React Query',
            last_name: 'Rules!'
        });
        console.log('This was an async mutation!');
        console.log('newUser: ', newUser);
        // queryClient.invalidateQueries('users');
        queryClient.setQueryData<Users | undefined>('users', oldData => {
            if (oldData) {
                return {
                    ...oldData,
                    data: [
                        {
                            first_name: newUser.first_name,
                            last_name: newUser.last_name
                        } as Data,
                        ...oldData.data
                    ]
                };
            }
        });
    };

    if (isLoading) return <p>Loading ...</p>;
    if (error || addError) return <p>Something went wrong ...</p>;
    if (!users) return null;

    console.log(users);



    return (
        <>
            <h4>List Page</h4>
            {isAddingUser ? <p>Adding user...</p> : null}
            <button onClick={handleAddUser}>Add User</button>

            <table className="table table-striped table-bordered" >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>View|Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {users.data.map(user => (
                        <tr
                            key={user.id}
                            className=""
                        >
                            <User
                                {...user}
                            />
                        </tr>
                    ))}
                </tbody>
            </table>


        </>
    );
};

export default UserList;

