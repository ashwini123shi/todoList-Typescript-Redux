
export const addTodo = (task: String) => {
  return {
    type: 'ADD_TODO',
    task
  };
};

export const editTodo = (id: Number, UpdatedTask: String, isUpdateDuplicate?: Boolean) => {
  return {
    type: 'EDIT_TODO',
    id,
    UpdatedTask,
    isUpdateDuplicate
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


export const setDuplicateItem = (duplicateItem: any) => {
  return {
    type: 'DUPLICATE_ITEM',
    duplicateItem
  };
};

export const setDuplicateEditItem = (duplicateEditItem: any) => {
  return {
    type: 'DUPLICATE_EDIT_ITEM',
    duplicateEditItem
  };
};

export const setDuplicateEditItemId = (duplicateEditItemId: String) => {
  return {
    type: 'DUPLICATE_EDIT_ITEM_ID',
    duplicateEditItemId
  };
};

export const setDuplicateItemIndex = (duplicateItemIndex: any) => {
  return {
    type: 'DUPLICATE_ITEM_INDEX',
    duplicateItemIndex
  };
};