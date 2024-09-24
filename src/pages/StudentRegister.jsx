import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import studentsService from "../services/students.service";
import { StudentContext } from "../context/student.context";

const initStudentInfoForm = {
  name: "",
  lastname: "",
  grade: "",
  group: "",
};

const StudentRegister = () => {
  const { studentId, updateStudentId } = useContext(StudentContext);
  const [ studentInfoForm, setStudentInfoForm ] = useState(initStudentInfoForm);
  const [ errorMessage, setErrorMessage ] = useState(undefined);

  const navigate = useNavigate();

  const handleStudentInfoForm = async (nameField, value) => {
    setStudentInfoForm({
      ...studentInfoForm,
      [nameField]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await studentsService.createStudent(studentInfoForm);
      const idStudent = response.data._id;
      updateStudentId(idStudent);
      console.log(studentId);
      navigate("/evaluations");
    } catch (error) {
      console.error("error", error);
      setErrorMessage(error.response.data.message);
    }
  };

  useEffect(() => {
    if (studentId) {
      navigate("/evaluations");
    }
  }, [studentId, navigate]);

  return (
    <>
      {!studentId ? (
        <div className="w-full sm:w-1/2">
          <div className="relative h-full ml-0 md:mr-10">
            <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-500 rounded-lg"></span>
            <div className="relative h-full p-5 bg-white border-2 border-blue-500 rounded-lg">
              <div className="flex items-center -mt-1 justify-center">
                <h1 className="my-2 ml-3 text-2xl font-bold text-gray-800">
                  Antes de comenzar registra tus datos
                </h1>
              </div>

              <form className="max-w-md mx-auto mt-4" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="flex flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Nombre(s)
                    </label>
                    <input
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      name="name"
                      id="name"
                      type="text"
                      required
                      value={studentInfoForm.name}
                      onChange={(e) =>
                        handleStudentInfoForm("name", e.target.value)
                      }
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Apellido(s)
                    </label>
                    <input
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      name="lastname"
                      id="lastname"
                      type="text"
                      required
                      value={studentInfoForm.lastname}
                      onChange={(e) =>
                        handleStudentInfoForm("lastname", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 md:gap-6">
                  <div className="mt-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="grade">
                      Grado
                    </label>
                    <select
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      name="grade"
                      id="grade"
                      required
                      value={studentInfoForm.grade}
                      onChange={(e) =>
                        handleStudentInfoForm("grade", e.target.value)
                      }>
                      <option value="" selected hidden disabled></option>
                      <option value="1RO">1RO</option>
                      <option value="2DO">2DO</option>
                      <option value="3RO">3RO</option>
                    </select>
                  </div>
                  <div className="mt-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="group">
                      Grupo
                    </label>
                    <select
                      className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                      name="group"
                      id="group"
                      required
                      value={studentInfoForm.group}
                      onChange={(e) =>
                        handleStudentInfoForm("group", e.target.value)
                      }>
                      <option value="" selected hidden disabled></option>
                      <option value="A">A</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Guardar
                  </button>
                </div>

                {errorMessage && <p className="text-red-800">{errorMessage}</p>}
              </form>
            </div>
          </div>
          
        </div>
      ) : null}
    </>
  );
};

export default StudentRegister;
