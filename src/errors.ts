export enum Errors {
  POST_HEADER_ERROR = 'Пост должен содержать заголовок',
  NO_POST_TAGS_ERROR = 'Статья должна содержать хотя бы 1 тег',
  TAGS_LIMIT_ERROR = 'Превышен лимит тегов',
  TAG_LENGTH_ERROR = 'Длина тега не должна превышать 20 символов',
  BACKEND_ERROR = 'Непредвиденная ошибка. Попробуйте позже',
  UNEXPECTED_ERROR = 'Ошибка. Проверьте подключение к интернету'
}