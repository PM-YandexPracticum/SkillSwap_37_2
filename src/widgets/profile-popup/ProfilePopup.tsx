import { useNavigate } from 'react-router-dom'
import { Icon } from '../../shared/ui/icon/Icon'
import styles from './ProfilePopup.module.css'
import { useDispatch } from '@store';
import { logoutThunk } from '../../services/user/actions';

export const ProfilePopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClickProfile = () => {
    navigate("/profile");
  };

  const logout = () => {
    dispatch(logoutThunk());
    navigate("/");
  };

  return(
    <div className={styles.container}>
      <ul className={styles.content}>
        <li onClick={handleClickProfile}>
          <span>Личный кабинет</span>
        </li>
        <li className={styles.logoutContainer} onClick={logout}>
          <span>Выйти из аккаунта</span>
          <Icon name='logout'/>
        </li>
      </ul>
    </div>
  )
}