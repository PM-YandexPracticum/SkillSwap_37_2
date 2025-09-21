import styles from './ErrorPage.module.css'
import { Button } from '../../shared/ui/button/Button'

type ErrorPageProps = {
  title: string;
  text: string;
  alt: string;
  image: string;
}

export const ErrorPage = ({ title, text, alt, image }: ErrorPageProps) => {
  return(
    <div className={styles.container}>
      <div className={styles.error_block}>
        <img src={image} alt={alt}/>
        <div className={styles.item_block}>
          <div className={styles.text}>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className={styles.button_block}>
            <Button className={styles.button}>Сообщить об ошибке</Button>
            <Button colored>На главную</Button>
          </div>
        </div>
      </div>
    </div>
  )
}