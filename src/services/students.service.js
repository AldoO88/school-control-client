import service from './index'

const studentsService = {
  createStudent: ( FormData ) => service.post(`/api/students/register`, FormData),
}

export default studentsService;