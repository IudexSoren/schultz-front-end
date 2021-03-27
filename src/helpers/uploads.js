import * as api from '../Api/api';


export const setFullPath = (path) => {
  const domain = 'http://localhost:5000/';
  return `${ domain }${ path }`;
}

export const uploadFile = async (type, id, idUsuario, file) => {
  try {
    const form = new FormData();
    form.set('archivo', file);
    const response = await api.uploadFile(type, id, idUsuario, form);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}

export const deleteFile = async (fileName) => {
  try {
    const pathArray = fileName.split('/');
    const type = pathArray[4], path = pathArray[5];
    const response = await api.deleteFile(type, path);
    return response.data;
  } catch (error) {
    console.log(error.response.data);
  }
}