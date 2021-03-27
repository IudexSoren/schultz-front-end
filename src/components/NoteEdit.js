import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { useForm } from '../Hooks/useForm';
import { createTask, unassignActiveTask, updateTask } from '../Actions/tasksActions';
import { taskExist } from '../helpers/tasks';
import { uploadFile, setFullPath, deleteFile } from '../helpers/uploads';
import { isEmpty, isDelayed } from '../helpers/validation';

import menu from '../Assets/Images/Menu.svg';
import addImage from '../Assets/Images/Add-Image.svg';
import deleteIcon from '../Assets/Images/Delete.svg';
import audio from '../Assets/Images/Audio-mic.svg';
import stop from '../Assets/Images/Stop.svg';
import save from '../Assets/Images/Save.svg';
import saveWhite from '../Assets/Images/Save-white.svg';
import clean from '../Assets/Images/Clean.svg';
import cleanWhite from '../Assets/Images/Clean-white.svg';
import cancel from '../Assets/Images/Cancel.svg';
import cancelWhite from '../Assets/Images/Cancel-white.svg';

const NoteEdit = ({ handleMenuState }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [programDate, setProgramDate] = useState(false);
  const { tasks, auth } = useSelector(state => state);

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));
  const minDate = () => {
    return `${ today.getFullYear() }-${ (today.getMonth() + 1 < 10) ? '0' : '' }${ today.getMonth() + 1 }-${ (today.getDate() + 2 < 10) ? '0' : '' }${ today.getDate() + 2 }`;
  }

  const initValue = {
    id: (tasks.tasks.length > 0) ? tasks.tasks[tasks.tasks.length - 1].id + 1 : 1,
    titulo: '',
    descripcion: '',
    fecha: '',
    img: '',
    audio: '',
    idUsuario: auth.user,
    idEstado: 1
  }
  const [formValues, handleInputChange, reset] = useForm(tasks.active || initValue);
  console.log(formValues);
  const handleDateChange = (value) => {
    const date = {
      target: {
        name: 'fecha',
        value: null
      }
    }
    switch (value) {
      case 1:
        date.target.value = today.toDateString();
        setProgramDate(false);
        break;
      case 2:
        date.target.value = tomorrow.toDateString();
        setProgramDate(false);
        break;

      default:
        date.target.value = today.toDateString();
        setProgramDate(false);
        break;
    }
    handleInputChange(date);
  }

  const handleUploadImage = async (e) => {
    const image = e.target.files[0];
    if (image?.type.match('image.*')) {
      deleteImageUploaded();
      const { path }  = await uploadFile('task', formValues.id, formValues.idUsuario, image);
      handleInputChange({
        target: {
          name: 'img',
          value: setFullPath(path)
        }
      });
    }
  }

  const deleteImageUploaded = async () => {
    if (formValues.img) {
      const { message } = await deleteFile(formValues.img);
      console.log(message);
      handleInputChange({
        target: {
          name: 'img',
          value: ''
        }
      });
    }
  }

  const deleteAudioUploaded = async () => {
    if (formValues.audio) {
      const { message } = await deleteFile(formValues.audio);
      console.log(message);
      handleInputChange({
        target: {
          name: 'audio',
          value: ''
        }
      });
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validation(formValues)) {
      console.log('Información incompleta o errónea');
      return;
    }
    const result = await taskExist(formValues.id , formValues.idUsuario);
    if (!result) {
      dispatch(createTask(formValues));
    } else {
      const updatedTask = { ...formValues };
      updatedTask.idEstado = 1;
      dispatch(updateTask(updatedTask.id, updatedTask.idUsuario, updatedTask));
    }
    history.replace('/');
  }

  const validation = (form) => {
    let error = false;
    if (isEmpty(form.titulo)) {
      error = true;
    }
    if (isEmpty(form.idUsuario)) {
      error = true;
    }
    if (isEmpty(form.fecha)) {
      error = true;
    } else if (isDelayed(form.fecha)) {
      error = true;
    }
    return error;
  }

  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const handleRecordAudio = () => {
    setIsRecording(!isRecording);
    if (isRecording) {
      mediaRecorder.stop();
      setMediaRecorder(null);
    } else {
      navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        const mediaRecorder = new MediaRecorder(stream);
        setMediaRecorder(mediaRecorder);
        mediaRecorder.start();
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", async () => {
          const audioBlob = new Blob(audioChunks, {
            type: 'audio/mp3'
          });
          const { path }  = await uploadFile('audio', formValues.id, formValues.idUsuario, audioBlob);
          handleInputChange({
            target: {
              name: 'audio',
              value: setFullPath(path)
            }
          })
        });

        setTimeout(() => {
          setIsRecording(false);
          if (mediaRecorder.state !== 'inactive') {
            mediaRecorder.stop();
          }
          setMediaRecorder(null);
        }, 30000);
      });
    }
  }

  const handleCancel = async () => {
    const result = await taskExist(formValues.id , formValues.idUsuario);
    if (!result) {
      await deleteImageUploaded();
      await deleteAudioUploaded();
    }
    history.replace('/');
    dispatch(unassignActiveTask());
  }

  return(
    <form className="noteedit__main" onSubmit={ handleSubmit } >
      <div className="title-container">
        <h1>Edición de tarea</h1>
        <img src={ menu } alt="Menú" onClick={ handleMenuState }/>
        <hr/>
      </div>
      <div className="noteedit__edit-area">
        <div className="noteedit__image-container">
          <img src={ formValues.img || addImage } alt="Tarea" className="noteedit__image-task" />
          {
            formValues.img &&
            <img
              src={ deleteIcon }
              alt="Eliminar imagen"
              className="noteedit__delete-image"
              onClick={ deleteImageUploaded }
            />
          }
          <input
            type="file"
            name="archivo"
            className="noteedit__file"
            onChange={ handleUploadImage }
          />
        </div>
        <div className="noteedit__options-container">
          <div className="noteedit__input-container">
            <label htmlFor="">Título</label>
            <input
              type="text"
              spellCheck="false"
              autoComplete="off"
              value={ formValues.titulo }
              name="titulo"
              onChange={ handleInputChange }
            />
            <small>El título de la tarea es requerido</small>
          </div>
          <div className="noteedit__options-secondary">
            <div className="noteedit__audio-container">
              <div
                className="noteedit_audio-icon-container">
                { !formValues.audio && <div className="noteedit__audio-icon" onClick={ handleRecordAudio } >
                  <img src={ isRecording ? stop : audio } alt="Audio"  />
                </div> }
                { formValues.audio && <img src={ deleteIcon } alt="Eliminar audio" className="noteedit__delete-image" onClick={ deleteAudioUploaded } /> }
              </div>
              {
                formValues.audio && <audio src={ formValues.audio } controls ></audio>
              }
            </div>
            <div className="noteedit__radio-container">
              <div className="noteedit__radio">
                <input
                  type="radio"
                  name="fecha"
                  onClick={ () => handleDateChange(1) }
                />
                <span>Hoy</span>
              </div>
              <div className="noteedit__radio">
                <input
                  type="radio"
                  name="fecha"
                  onClick={ () => handleDateChange(2) }
                />
                <span>Mañana</span>
              </div>
              <div className="noteedit__radio">
                <input
                  type="radio"
                  name="fecha"
                  onClick={ () => setProgramDate(true) }
                />
                <span>Programar</span>
              </div>
              {
                formValues.fecha && <p>Tarea establecida para: { new Date(formValues.fecha).toLocaleDateString() }</p>
              }
              {
                programDate &&
                <input
                  min={ minDate() }
                  type="date"
                  name="fecha"
                  className="noteedit__date"
                  value={ formValues.fecha }
                  onChange={ handleInputChange }
                />
              }
            </div>
          </div>
        </div>
        <div className="noteedit__textarea-container">
          <label htmlFor="">Descripción</label>
          <textarea
            name="descripcion"
            spellCheck="false"
            value={ formValues.descripcion }
            onChange={ handleInputChange }
          ></textarea>
        </div>
      </div>
      <div className="noteedit_button-container">
        <button className="btn btn-primary" type="submit">
          <img src={ save } alt="Guardar"/>
          <img src={ saveWhite } alt="Guardar" className="noteedit__whiteImg"/>
          <span>&nbsp;Guardar</span>
        </button>
        <div className="noteedit__buttons">
          <button className="btn btn-secondary" type="reset" onClick={ () => {
            reset(initValue)
            setProgramDate(false)
          } }>
            <img src={ clean } alt="Limpiar"/>
            <img src={ cleanWhite } alt="Limpiar" className="noteedit__whiteImg"/>
            <span>&nbsp;Limpiar</span>
          </button>
          <button className="btn btn-danger" type="button" onClick={ handleCancel }>
            <img src={ cancel } alt="Cancelar"/>
            <img src={ cancelWhite } alt="Cancelar" className="noteedit__whiteImg"/>
            <span>&nbsp;Cancelar</span>
          </button>
        </div>
      </div>
    </form>
  );
}

export default NoteEdit;