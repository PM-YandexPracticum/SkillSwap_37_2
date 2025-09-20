import { ErrorPage } from "../../widgets/error-page/ErrorPage"

export const NotFoundPage = () => {
  return(
    <ErrorPage
      title='Страница не найдена'
      text='К сожалению, эта страница недоступна.
            Вернитесь на главную страницу или попробуйте позже'
      image='src/shared/assets/images/error 404.svg'
      alt='Ошибка 404'
    />
  )
}