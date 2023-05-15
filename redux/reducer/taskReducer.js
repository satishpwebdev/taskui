import { TASKS, ADDTASK, DELETETASK } from "../action/tasks";

const initialState = {
   tasksList: null,
   addTask: null,
   deleteTask: null,
};

const taskReducer = (state = initialState, action) => {
   switch (action.type) {
      case TASKS:
         return {
            ...state,
            taskList: action.data,
         };
      case ADDTASK:
         return {
            ...state,
            addTask: action.data,
         };
      case DELETETASK:
         return {
            ...state,
            deleteTask: action.data,
         };
   }
   return state;
};

export default taskReducer;
