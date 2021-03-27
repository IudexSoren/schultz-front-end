import { Provider } from 'react-redux';

import AppRouter from './Router/AppRouter';
import { store } from './Reducers/index';

import './styles/index.css';

const App = () => {

  return (
    <Provider store={ store }>
      <AppRouter />
    </Provider>
  );
}

export default App;