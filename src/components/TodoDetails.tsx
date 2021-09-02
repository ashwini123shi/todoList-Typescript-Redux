import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';
interface taskItem {
    id: Number,
    task: String,
    completed: Boolean
}
const TodoDetails = (props: any): React.ReactElement => {
    const { list } = useSelector(state => state.todos);

    useEffect(() => {
        console.log(props.match.params.id);
        //item = list.find((item: taskItem) => item.id === match.params.id);
        fetchitem();
    }, []);


    const fetchitem = () => {
        return list.find((item: taskItem) => item.id === Number(props.match.params.id));
    };
    let item: taskItem = fetchitem();
    return (<>
        <Card>
            {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" /> */}
            <CardBody>
                <CardTitle tag="h5">{item.task}</CardTitle>
                {/* <CardSubtitle tag="h6" className="mb-2 text-muted">Card subtitle</CardSubtitle>
                <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                <Button>Button</Button> */}
            </CardBody>
        </Card>
    </>);
};

export default TodoDetails;