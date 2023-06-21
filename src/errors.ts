export enum Errors {
  POST_HEADER_ERROR = 'Пост должен содержать заголовок',
  NO_POST_TAGS_ERROR = 'Статья должна содержать хотя бы 1 тег',
  TAGS_LIMIT_ERROR = 'Превышен лимит тегов',
  TAG_LENGTH_ERROR = 'Длина тега не должна превышать 20 символов',
  UNEXPECTED_ERROR = 'Непредвиденная ошибка. Попробуйте позже',
  NO_CONNECTION = 'Ошибка. Отсутствует подключение к интернету',
  ARTICLE_LENGTH_ERROR = 'Недопустимая длина статьи',
  EMPTY_LOGIN_OR_PASSWORD_ERROR = 'Введите логин и пароль'
}