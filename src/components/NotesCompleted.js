import Note from './Note';

import menu from '../Assets/Images/Menu.svg';


const NotesCompleted = ({ handleMenuState, tasks }) => {

  return(
    <main className="notesarea__main">
      <div className="title-container">
        <h1>Tareas completadas</h1>
        <img src={ menu } alt="Menú" onClick={ handleMenuState } />
        <hr/>
      </div>
      <div className="notesarea__notes-container">
        {
          tasks.map(task => <Note key={ task.id } task={ task } />)
        }
      </div>
    </main>
  );
}

export default NotesCompleted;