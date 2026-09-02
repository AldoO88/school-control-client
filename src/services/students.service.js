import service from './index'

const studentsService = {
  createStudent: ( FormData ) => service.post(`/api/students/register`, FormData),
  getAllStudents: () => service.get('/api/students'),
}

export default studentsService;