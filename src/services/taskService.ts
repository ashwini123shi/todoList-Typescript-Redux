import { DefaultRootState, useDispatch, useSelector } from "react-redux";
type taskProps = {
    id: number,
    task: string,
    completed: Boolean
}
const { list, duplicateItem } = useSelector(state => state.todos);

export const getTaskById = (id: Number): void => {
    return list.find((item: taskProps) => item.id === Number(id));
}

