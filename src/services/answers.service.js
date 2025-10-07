import service from './index'

const answersService = {
  createAnswers: (category, data, idUser ) => service.post(`/api/tests/${category}/${idUser}`, data),
  getAnsweredTest: (idUser) => service.get(`/api/tests/${idUser}`),
  getStudentsByGroupAndCategory: (params) => service.get("/api/tests/students/group-category", {params}),
};

export default answersService;