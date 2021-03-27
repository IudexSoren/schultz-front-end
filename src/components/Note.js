import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { assignActiveTask, updateTask, deleteTask } from '../Actions/tasksActions';
import { deleteFile } from '../helpers/uploads';

import taskImg from '../Assets/Images/Task.svg';
import audio from '../Assets/Images/Audio.svg';
import options from '../Assets/Images/Options.svg';
import check from '../Assets/Images/Check.svg';
import taskCompleted from '../Assets/Images/taskCompleted.svg';
import edit from '../Assets/Images/Edit.svg';
import deleteNote from '../Assets/Images/Delete.svg';


const Note = ({ task }) => {

  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu(!showMenu);
  }

  const handleCompleteTask = () => {
    task.idEstado = 2;
    dispatch(updateTask(task.id, task.idUsuario, task));
  }

  const handleDeleteTask = async () => {
    if (task.img) {
      const { message } = await deleteFile(task.img);
      console.log(message);
    }
    if (task.audio) {
      const { message } = await deleteFile(task.audio);
      console.log(message);
    }
    dispatch(deleteTask(task.id, task.idUsuario));
  }

  const handleSetActiveTask = () => {
    dispatch(assignActiveTask(task));
    history.push('/note');
  }

  return(
    <div className="note__container">
      <img src={ task.img || taskImg } alt="Nota" className="note__image" />
      <div className="note__content">
        <div className="note__header">
          <h2>{ task.titulo }</h2>
          {
            task.audio !== '' && <img src={ audio } alt="Audio"/>
          }
        </div>
        <p>{ task.descripcion }</p>
        <div className="note__footer">
          <span>{ new Date(task.fecha).toLocaleDateString() }</span>
          <img src={ options } alt="Opciones" className="note__options" onClick={ handleShowMenu } />
          <div className={ `note__option-container ${ (showMenu) ? 'note__show-option-container' : '' }` }>
            {
              (task.idEstado === 2) ?
              <img src={ taskCompleted } alt="Completada"/> :
              <img src={ check } alt="Completar" onClick={ handleCompleteTask } />
            }
            <img src={ edit } alt="Editar" onClick={ handleSetActiveTask } />
            <img src={ deleteNote } alt="Borrar" onClick={ handleDeleteTask } />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Note;