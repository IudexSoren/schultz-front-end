import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { useForm } from '../Hooks/useForm';
import { logIn, logUp } from '../Actions/authActions';
import { isEmpty } from '../helpers/validation';

import logo from '../Assets/Images/Schultz.svg';

const initState = {
  nombreUsuario: 'IudexSoren',
  contrasenia: 'Soren616@',
  confirmarContrasenia: ''
}

const Authenticaction = () => {

  const [isLogUp, setIsLogUp] = useState(false);
  const [form, handleInputChange] = useForm(initState);

  const dispatch = useDispatch();

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (validation(form)) {
      console.log('Información incompleta');
      return;
    }
    if (isLogUp) {
      dispatch(logUp(form, setIsLogUp));
    } else {
      dispatch(logIn(form));
    }
  }

  const handleLogUp = () => {
    setIsLogUp(!isLogUp);
  }

  const validation = (form) => {
    let error = false;
    if (isEmpty(form.nombreUsuario)) {
      error = true;
    }
    if (isEmpty(form.contrasenia)) {
      error = true;
    }
    if (isLogUp)
      if (isEmpty(form.confirmarContrasenia)) {
        error = true;
      }
    return error;
  }

  return(
    <div className="authentication__container">
      <div className="authentication__form-container">
        <img src={ logo } alt="Schultz logo" className="authentication__logo" />
        <form onSubmit={ handleSubmit }>
          <div className="authentication__form-control">
            <label>Usuario</label>
            <input
              type="text"
              name="nombreUsuario"
              value={ form.nombreUsuario }
              onChange={ handleInputChange }
              spellCheck="false"
              autoComplete="off"
            />
            <small>El nombre de usuario es requerido</small>
          </div>
          <div className="authentication__form-control">
            <label>Contraseña</label>
            <input
              type="password"
              name="contrasenia"
              value={ form.contrasenia }
              onChange={ handleInputChange }
              spellCheck="false"
              autoComplete="off"
            />
            <small>La contraseña es requerida</small>
          </div>
          {
            (isLogUp) &&
            (
              <div className="authentication__form-control">
                <label>Confirmar contraseña</label>
                <input
                  type="password"
                  name="confirmarContrasenia"
                  value={ form.confirmarContrasenia }
                  onChange={ handleInputChange }
                  spellCheck="false"
                  autoComplete="off"
                />
                <small>Debe confirmar su contraseña</small>
              </div>
            )
          }
          <button className="btn btn-primary" type="submit">
            { (isLogUp) ? 'Crear cuenta' : 'Ingresar' }
          </button>
          <div className="authentication__o">
            o
          </div>
          <button className="btn btn-simple" onClick={ handleLogUp } type="button">
            { (isLogUp) ? 'Ingresar' : 'Crear cuenta' }
          </button>
        </form>
      </div>
    </div>
  );
}

export default Authenticaction;