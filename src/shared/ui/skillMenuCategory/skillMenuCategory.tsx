import { FC } from "react";
import { Icon } from "../icon/Icon";
import styles from './SkillMenuCategory.module.css'

export const SkillMenuCategoryUI: FC = () => {
  return(
    <li className={styles.category}>
      <Icon name='briefcase' color='#eee7f7'/>
      <div className={styles.div}>
        <h1></h1>
        <li className={styles.li}>Управление командой</li>
        <li className={styles.li}>Маркетинг и реклама</li>
      </div>
    </li>
  )
}