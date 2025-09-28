import { useNavigate } from 'react-router-dom'
import { Icon } from '../../shared/ui/icon/Icon'
import styles from './ProfilePopup.module.css'
import { setLogout } from '../../services/user/user-slice';
import { useDispatch } from '@store';

export const ProfilePopup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleClickProfile = () => {
    navigate("/profile");
  };

  const logout = () => {
    dispatch(setLogout());
    // navigate('/')
  }

  return(
    <div className={styles.container}>
      <ul className={styles.content}>
        <li className={styles.li} onClick={handleClickProfile}>Личный кабинет</li>
        <li className={styles.logoutContainer} onClick={logout}>
          <p>Выйти из аккаунта</p>
          <Icon name='logo'/>
        </li>
      </ul>
    </div>
  )
}