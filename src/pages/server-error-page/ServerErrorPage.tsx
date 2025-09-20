import { ErrorPage } from "../../widgets/error-page/ErrorPage"

export const ServerErrorPage = () => {
  return(
    <ErrorPage
      title='На сервере произошла ошибка'
      text='Попробуйте позже или вернитесь на главную страницу'
      image='src/shared/assets/images/error 500.svg'
      alt='Ошибка сервера 500'
    />
  )
}