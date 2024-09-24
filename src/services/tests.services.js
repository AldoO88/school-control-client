import service from './index'

const testsService = {
  createTest: (category, data, idStudent ) => service.post(`/api/evaluations/${category}/${idStudent}`, data),
  getAnsweredTest: (idStudent) => service.get(`/api/evaluations/${idStudent}`)
}

export default testsService;