import Note from './Note';

import { filterTasksByDate, filterTasksByLaterDate } from '../helpers/filterTasks';

import menu from '../Assets/Images/Menu.svg';


const NotesPending = ({ handleMenuState, tasks }) => {

  const today = new Date();
  const tomorrow = new Date(new Date().setDate(today.getDate() + 1));

  const todayTasks = filterTasksByDate(tasks, today);
  const tomorrowTasks = filterTasksByDate(tasks, tomorrow);
  const laterTasks = filterTasksByLaterDate(tasks, today, tomorrow);

  const renderTasks = (list, day) => {
    return(
      <>
        { list.length > 0 && <div className="notesarea__date">{ day !== '' ? day : <hr/> }</div> }
        { list.map(task => <Note key={ task.id } task={ task } />) }
      </>
    )
  }

  return(
    <main className="notesarea__main">
      <div className="title-container">
        <h1>Tareas pendientes <span>({ tasks.length })</span></h1>
        <img src={ menu } loading="lazy" alt="Menú" onClick={ handleMenuState } />
        <hr/>
      </div>
      <div className="notesarea__notes-container">
        {
          renderTasks(todayTasks, 'Hoy')
        }
        {
          renderTasks(tomorrowTasks, 'Mañana')
        }
        {
          renderTasks(laterTasks, 'Después')
        }
      </div>
    </main>
  );
}

export default NotesPending;