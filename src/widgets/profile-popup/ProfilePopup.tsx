import { Icon } from '../../shared/ui/icon/Icon'
import styles from './ProfilePopup.module.css'

export const ProfilePopup = () => {
  return(
    <div className={styles.container}>
      <div className={styles.content}>
        <p>Личный кабинет</p>
        <div className={styles.logoutContainer}>
          <p>Выйти из аккаунта</p>
          <Icon name='logo'/>
        </div>
      </div>
    </div>
  )
}