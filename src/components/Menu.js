import { useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import decode from 'jwt-decode';

import { logOut } from '../Actions/authActions';
import { cleanTasks, unassignActiveTask } from '../Actions/tasksActions';

import close from '../Assets/Images/Close.svg';
import logo from '../Assets/Images/Schultz.svg';
import pending from '../Assets/Images/Pending.svg';
import completed from '../Assets/Images/Completed.svg';
import late from '../Assets/Images/Late.svg';
import user from '../Assets/Images/User.svg';
import gear from '../Assets/Images/Gear.svg';
import logout from '../Assets/Images/Logout.svg';


const Menu = ({ handleMenuState, menuActive, currentUser, tasks }) => {

  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
    dispatch(cleanTasks());
    history.replace('/auth');
  }

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem('auth'))?.token;
    if (token) {
      const decodedToken = decode(token);
      if (decodedToken.exp * 1000 < new Date().getTime())
        handleLogOut();
    }
  }, [location])

  const pendingCounter = tasks.length;

  return(
    <div className={`menu__container ${ (menuActive) ? 'menu__active' : '' }`}>
      <img src={ close } alt="Close menu" className="menu__close-menu" onClick={ handleMenuState } />
      <img src={ logo } alt="Schultz logo" className="menu__logo"/>
      <div className="menu__search-container">
        <input type="text" name="" placeholder="Buscar tarea" spellCheck="false" autoComplete="off" />
        <button className="btn btn-secondary">Buscar</button>
      </div>
      <div className="menu__options-container">
        <NavLink to='/note' onClick={ () => {
          handleMenuState(false);
          dispatch(unassignActiveTask());
        } }>
          <button className="btn btn-primary">
            Agregar tarea
          </button>
        </NavLink>
        <NavLink to='/pending' activeClassName='menu__option-selected'>
          <div className="menu__option">
            <img src={ pending } alt="Pending"/>
            <span>Pendientes</span>
            <hr/>
          </div>
        </NavLink>
        <NavLink to='/completed' activeClassName='menu__option-selected'>
          <div className="menu__option">
            <img src={ completed } alt="Pending"/>
            <span>Completadas</span>
            <hr/>
          </div>
        </NavLink>
        <NavLink to='/delayed' activeClassName='menu__option-selected'>
          <div className="menu__option">
            <img src={ late } alt="Pending"/>
            <span>Atrasadas</span>
            <hr/>
          </div>
        </NavLink>
      </div>
      <div className="menu__user-container">
        <img src={ user } alt="Usuario" />
        <div className="menu__user-info">
          <span className="menu__user-name">{ currentUser }</span>
          <div className="menu__user-pending">
            <span>{ pendingCounter }</span>&nbsp;Pendientes
          </div>
        </div>
        <div className="menu__user-options">
          <NavLink to='/profile' onClick={ () => handleMenuState(false) }>
            <img src={ gear } alt="Configuración"/>
          </NavLink>
          <img src={ logout } alt="Cerrar sesión" onClick={ handleLogOut } />
        </div>
      </div>
    </div>
  );
}

export default Menu;