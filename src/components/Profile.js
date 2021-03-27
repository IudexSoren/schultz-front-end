import menu from '../Assets/Images/Menu.svg';
import save from '../Assets/Images/Save.svg';
import saveWhite from '../Assets/Images/Save-white.svg';
import cancel from '../Assets/Images/Cancel.svg';
import cancelWhite from '../Assets/Images/Cancel-white.svg';


const Profile = ({ handleMenuState }) => {



  return(
    <form className="profile__main">
      <div className="title-container">
        <h1>Perfil</h1>
        <img src={ menu } alt="Menú" onClick={ handleMenuState }/>
        <hr/>
      </div>
      <div className="profile__content">
        <div className="profile__section-container">
          <div className="profile__section-title">Cambiar contraseña</div>
          <div className="profile__input-container">
            <label htmlFor="">Nueva contraseña</label>
            <input type="password"/>
            <small>Es requerido ingresar una contraseña</small>
          </div>
          <div className="profile__input-container">
            <label htmlFor="">Contraseña actual</label>
            <input type="password"/>
            <small>Ingrese su contraseña actual para realizar cambios</small>
          </div>
        </div>
        <div className="profile__section-container">
          <div className="profile__section-title">
            Cambiar modo
          </div>
        </div>
      </div>
      <div className="profile_button-container">
        <button className="btn btn-primary" type="submit">
          <img src={ save } alt="Guardar"/>
          <img src={ saveWhite } alt="Guardar" className="profile__whiteImg"/>
          <span>&nbsp;Guardar</span>
        </button>
        <button className="btn btn-danger" type="button">
          <img src={ cancel } alt="Cancelar"/>
          <img src={ cancelWhite } alt="Cancelar" className="profile__whiteImg"/>
          <span>&nbsp;Cancelar</span>
        </button>
      </div>
    </form>
  );
}

export default Profile;