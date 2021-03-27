import { FETCH_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, CLEAN_TASKS, ASSIGN_ACTIVE_TASK, UNASSIGN_ACTIVE_TASK } from '../Constants/types';

export const taskReducer = (state = { active: null, tasks: [] }, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return {
        ...state,
        tasks: action.payload
      };
    case CREATE_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload]
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          (task.id === action.payload.id) ? action.payload : task)
      };
    case DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload)
      };
    case CLEAN_TASKS:
      return {
        active: null,
        tasks: []
      }
    case ASSIGN_ACTIVE_TASK:
      return {
        ...state,
        active: action.payload
      };
    case UNASSIGN_ACTIVE_TASK:
      return {
        ...state,
        active: null
      };

    default:
      return state;
  }
}