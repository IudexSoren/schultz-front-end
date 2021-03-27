import * as api from '../Api/api';
import { CREATE_TASK, UPDATE_TASK, DELETE_TASK, FETCH_TASKS, CLEAN_TASKS, ASSIGN_ACTIVE_TASK, UNASSIGN_ACTIVE_TASK } from '../Constants/types';

export const fetchTasks = (id) => async (dispatch) => {
  try {
    const response = await api.fetchTasks(id);
    const { result } = response.data;
    dispatch({
      type: FETCH_TASKS,
      payload: result
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export const createTask = (newTask) => async (dispatch) => {
  try {
    const response = await api.createTask(newTask);
    const { task } = response.data;
    dispatch({
      type: CREATE_TASK,
      payload: task
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export const updateTask = (id, idUsuario, updatedTask) => async (dispatch) => {
  try {
    const response = await api.updateTask(id, idUsuario, updatedTask);
    const { task } = response.data;
    dispatch({
      type: UPDATE_TASK,
      payload: task
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export const deleteTask = (id, idUsuario) => async (dispatch) => {
  try {
    await api.deleteTask(id, idUsuario);
    dispatch({
      type: DELETE_TASK,
      payload: id
    });
  } catch (error) {
    console.log(error.response.data);
  }
}

export const cleanTasks = () => (dispatch) => {
  dispatch({
    type: CLEAN_TASKS
  });
}

export const assignActiveTask = (task) => (dispatch) => {
  dispatch({
    type: ASSIGN_ACTIVE_TASK,
    payload: task
  });
}

export const unassignActiveTask = () => (dispatch) => {
  dispatch({
    type: UNASSIGN_ACTIVE_TASK
  });
}