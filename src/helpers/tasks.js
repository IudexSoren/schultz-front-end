import * as api from '../Api/api';

export const taskExist = async (id, idUsuario) => {
  try {
    const response = await api.getTask(id, idUsuario);
    const { result } = response.data;
    return result;
  } catch (error) {
    console.log(error);
  }
}