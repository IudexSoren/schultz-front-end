import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch } from "react-router-dom";

import Authentication from '../components/Authentication';
import Workarea from '../components/Workarea';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';

import { loggedIn } from '../Actions/authActions';
import { fetchTasks } from '../Actions/tasksActions';

const AppRouter = () => {

  const user = JSON.parse(localStorage.getItem('auth'));
  const dispatch = useDispatch();
  const { auth } = useSelector(state => state);
  const [isAuthenticated, setIsAuthenticated] = useState(auth.logged);

  useEffect(() => {
    if (user?.token) {
      dispatch(loggedIn(user.user, user.token));
      dispatch(fetchTasks(user.user));
    }
    setIsAuthenticated(auth.logged);
  }, [dispatch, auth.logged, user?.token, user?.user]);

  return(
    <Router>
      <Switch>
        <PublicRoute
          path='/auth'
          component={ Authentication }
          isAuthenticated={ isAuthenticated }
        />
        <PrivateRoute
          path='/'
          component={ Workarea }
          isAuthenticated={ isAuthenticated }
        />
      </Switch>
    </Router>
  );
}

export default AppRouter;