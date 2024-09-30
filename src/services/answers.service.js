import service from './index'

const answersService = {
  createAnswers: (category, data, idUser ) => service.post(`/api/tests/${category}/${idUser}`, data),
  getAnsweredTest: (idUser) => service.get(`/api/tests/${idUser}`),
}

export default answersService;