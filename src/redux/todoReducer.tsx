
const initalState = {
  counter: 0,
  list: [{ id: 0, task: "list 1", completed: false }],
  duplicateItem: '',
  duplicateEditItem: '',
  duplicateEditItemId: 0,
  duplicateItemIndex: ''
};

const addTodo=(state,action)=>{
  state.counter++;
  state.list=[
    ...state.list,
    { id: state.counter, task: action.task, completed: false }
  ];
  state.duplicateItem = false;
};
const updateTodo=(state,action)=>{
  if (!!state.list.find((item) => item.task === action.UpdatedTask)) {
    //fetch indexes of duplicate item

    let duplicateIndexes=state.list.map((item, index) =>item.task === action.UpdatedTask ? index++ : undefined).filter(x => x);

    let index = state.list.findIndex((item) => item.task === action.UpdatedTask);
    if (state.list[index].id !== action.id) {
      state.duplicateItemIndex = duplicateIndexes.toString();
      state.duplicateEditItem = action.UpdatedTask;
      state.duplicateEditItemId = action.id;
    }
    if (action.isUpdateDuplicate) {
      state.list[state.list.findIndex((item) => item.id === Number(action.id))].task = action.UpdatedTask;
      state.duplicateEditItem = false;
    }
  } else {
    state.list[state.list.findIndex((item) => item.id === Number(action.id))].task = action.UpdatedTask;
  }
}

const deleteTodo=(state,action)=>{
  state.list=state.list.filter(item => item.id !== Number(action.id));
  state.duplicateItem = false;
};

const toggleTodo=(state,action)=>{
  state.list=state.list.map(todo =>
    todo.id === Number(action.id) ? { ...todo, completed: !todo.completed } : todo
  );
};

const clearTodoList=(state)=>{
  state.list = [{ id: 0, task: "list 1", completed: false }];
  state.counter = 0;
  state.duplicateItem = '';
  state.duplicateEditItem = '';
  state.duplicateEditItemId = 0;
  state.duplicateItemIndex ='';
};

const todos = (state = initalState, action) => {
  
  switch (action.type) {
    case 'ADD_TODO':
      addTodo(state,action);
      return {
       ...state
      };
    case 'EDIT_TODO':
      updateTodo(state,action);
      return {
        ...state
      };
    case 'CLEAR_TODO_LIST':
      clearTodoList(state);
      return {
        ...state
      };
    case 'DELETE_TODO':
      deleteTodo(state,action);
      return {
        ...state
      };
    case 'TOGGLE_TODO':
      toggleTodo(state,action);
      return {
        ...state
      };
    case 'DUPLICATE_ITEM':
      return {
        ...state,
        duplicateItem: action.text
      };
    case 'DUPLICATE_EDIT_ITEM':
      return {
        ...state,
        duplicateEditItem: action.text
      };
    case 'DUPLICATE_EDIT_ITEM_ID':
      return {
        ...state,
        duplicateEditItemId: action.text
      };
    case 'DUPLICATE_ITEM_INDEX':
      return {
        ...state,
        duplicateItemIndex: action.text
      };
    default:
      return state;
  }
};

export default todos;