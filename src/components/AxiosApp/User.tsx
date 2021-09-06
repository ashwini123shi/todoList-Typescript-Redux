
import { ReactElement } from 'react';
import { Link } from 'react-router-dom';//router

interface Props {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}
const SingleUser = ({ id, email, first_name, last_name, avatar }: Props): ReactElement => {
    return (
        <>
            <td className="m-1">{first_name}{last_name}</td>
            <td>{email}</td>
            <td>
                <Link to={`/view-user/${id}`}> view</Link>
            </td>
        </>
    );
};

export default SingleUser;
