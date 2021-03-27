import { useState } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Menu from './Menu';
import NotesPending from './NotesPending';
import NotesDelayed from './NotesDelayed';
import NotesCompleted from './NotesCompleted';
import NoteEdit from './NoteEdit';
import Profile from './Profile';

import { filterTasksByState } from '../helpers/filterTasks';
import { isDelayed } from '../helpers/validation';
import { updateTask } from '../Actions/tasksActions';

const Workarea = () => {

  const dispatch = useDispatch();
  const { auth, tasks } = useSelector(state => state);
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuState = () => {
    setMenuActive(!menuActive);
  }

  const pendingTasks = filterTasksByState(tasks.tasks, 1);
  pendingTasks.forEach(task => {
    if (isDelayed(task.fecha)) {
      task.idEstado = 3;
      dispatch(updateTask(task.id, task.idUsuario, task));
    }
  });
  const completedTasks = filterTasksByState(tasks.tasks, 2);
  const delayedTasks = filterTasksByState(tasks.tasks, 3);

  return (
    <div className="workarea__container">
      <Menu handleMenuState={ handleMenuState } menuActive={ menuActive } currentUser={ auth.user } tasks={ pendingTasks } />
      <Switch>
        <Route exact path='/pending' component={
            (props) => <NotesPending { ...props } handleMenuState={ handleMenuState } tasks={ pendingTasks } />
          }
        />
        <Route exact path='/delayed' component={
            (props) => <NotesDelayed { ...props } handleMenuState={ handleMenuState } tasks={ delayedTasks } />
          }
        />
        <Route exact path='/completed' component={
            (props) => <NotesCompleted { ...props } handleMenuState={ handleMenuState } tasks={ completedTasks } />
          }
        />
        <Route exact path='/note' component={
            (props) => <NoteEdit { ...props } handleMenuState={ handleMenuState } />
          }
        />
        <Route exact path='/profile' component={
            (props) => <Profile { ...props } handleMenuState={ handleMenuState } />
          }
        />
        <Redirect to='/pending'/>
      </Switch>
    </div>
  );
}

export default Workarea;