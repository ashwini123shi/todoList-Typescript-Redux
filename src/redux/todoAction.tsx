
export const addTodo = (task: String) => {
  return {
    type: 'ADD_TODO',
    task
  };
};

export const editTodo = (id: Number, UpdatedTask: String, isUpdateDuplicate?: Boolean) => {
  return {
    type: 'EDIT_TODO',
    id: Number,
    UpdatedTask: String,
    isUpdateDuplicate: Boolean
  };
};

export const clearTodoList = () => {
  return {
    type: 'CLEAR_TODO_LIST'
  };
};

export const deleteTodo = (id: Number) => {
  return {
    type: 'DELETE_TODO',
    id
  };
};

export const toggleTodo = (id: Number) => {
  return {
    type: 'TOGGLE_TODO',
    id
  };
};


export const setDuplicateItem = (text: any) => {
  return {
    type: 'DUPLICATE_ITEM',
    text: String
  };
};

export const setDuplicateEditItem = (text: any) => {
  return {
    type: 'DUPLICATE_EDIT_ITEM',
    text: String
  };
};

export const setDuplicateEditItemId = (text: String) => {
  return {
    type: 'DUPLICATE_EDIT_ITEM_ID',
    text
  };
};

export const setDuplicateItemIndex = (text: any) => {
  return {
    type: 'DUPLICATE_ITEM_INDEX',
    text
  };
};