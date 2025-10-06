import service from './index'

const answersService = {
  createAnswers: (category, data, idUser ) => service.post(`/api/tests/${category}/${idUser}`, data),
  getAnsweredTest: (idUser) => service.get(`/api/tests/${idUser}`),
  eetStudentsByGroupAndCategory (grade, group, category) => service.get("/api/students/group-category", {
      params: { grade, group, category },
    });
  
  };
}

export default answersService;