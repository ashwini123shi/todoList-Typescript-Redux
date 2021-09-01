
export const addTodo = task => {
    return {
      type: 'ADD_TODO',
      task
    };
  };

  export const editTodo = (id,UpdatedTask,isUpdateDuplicate) => {
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
  
  export const deleteTodo = id => {
    return {
      type: 'DELETE_TODO',
      id
    };
  };
  
  export const toggleTodo = id => {
    return {
      type: 'TOGGLE_TODO',
      id
    };
  };


  export const setDuplicateItem = text => {
    return {
      type: 'DUPLICATE_ITEM',
      text
    };
  };

  export const setDuplicateEditItem = text => {
    return {
      type: 'DUPLICATE_EDIT_ITEM',
      text
    };
  };

  export const setDuplicateEditItemId = text => {
    return {
      type: 'DUPLICATE_EDIT_ITEM_ID',
      text
    };
  };

  export const setDuplicateItemIndex = text => {
    return {
      type: 'DUPLICATE_ITEM_INDEX',
      text
    };
  };