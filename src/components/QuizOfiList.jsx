import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { StudentContext } from "../context/student.context";
import testsService from "../services/tests.service";

const ofiQuizzes = [
  { id: "ofimatica-1RO", title: "Quiz de Ofimática - 1RO", description: "Introducción a la informática: partes de la computadora, hardware, software, sistemas operativos, redes básicas y herramientas ofimáticas (Word, Excel, PowerPoint)." },
  { id: "ofimatica-2DO", title: "Quiz de Ofimática - 2DO", description: "Conceptos intermedios: hardware avanzado, memoria, periféricos, redes y topologías, atajos de teclado, aplicaciones ofimáticas y fundamentos de algoritmos." },
  { id: "ofimatica-3RO", title: "Quiz de Ofimática - 3RO", description: "Evaluación integral: hardware, redes, sistemas operativos, herramientas ofimáticas, algoritmos y operadores lógicos." },
];

const QuizOfiList = () => {
  const { studentId, grade, clearStudentId } = useContext(StudentContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [answeredMap, setAnsweredMap] = useState({});

  const filteredQuizzes = grade
    ? ofiQuizzes.filter((q) => q.id === `ofimatica-${grade}`)
    : ofiQuizzes;

  useEffect(() => {
    const getAnswered = async () => {
      try {
        setLoading(true);
        const response = await testsService.getAnsweredTest(studentId);
        const data = response.data || [];
        const map = {};
        data.forEach((a) => {
          map[a.test] = a;
        });
        setAnsweredMap(map);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (studentId) getAnswered();
  }, [studentId]);

  const handleExit = () => {
    clearStudentId();
    navigate("/");
  };

  const allDone = filteredQuizzes.every((q) => Boolean(answeredMap[q.id]));

  return (
    <div className="flex flex-row gap-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 p-4">
          Quizzes de Ofimática
        </h2>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">Título</th>
                  <th scope="col" className="px-6 py-3">Descripción</th>
                  <th scope="col" className="px-6 py-3">Estatus</th>
                  <th scope="col" className="px-6 py-3">Resultado</th>
                  <th scope="col" className="px-6 py-3">Acción</th>
                </tr>
              </thead>
              <tbody>
                {filteredQuizzes.map((quiz) => {
                  const answered = answeredMap[quiz.id];
                  return (
                    <tr
                      key={quiz.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {quiz.title}
                      </th>
                      <td className="px-6 py-4">{quiz.description}</td>
                      {answered ? (
                        <>
                          <td className="px-6 py-4">
                            <span className="inline-flex h-8 w-20 font-bold bg-green-300 items-center text-red-700 justify-center rounded-lg">
                              Realizado
                            </span>
                          </td>
                          <td className="px-6 py-4 font-bold text-rose-800">
                            {answered.result}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <span className="cursor-not-allowed opacity-30 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg">
                              Realizar
                            </span>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="px-6 py-4">
                            <span className="inline-flex h-8 w-20 font-bold bg-yellow-300 items-center text-red-700 justify-center rounded-lg">
                              Pendiente
                            </span>
                          </td>
                          <td className="px-6 py-4"></td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              to={quiz.id}
                              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                              Realizar
                              <svg
                                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 10"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M1 5h12m0 0L9 1m4 4L9 9"
                                />
                              </svg>
                            </Link>
                          </td>
                        </>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {allDone && (
              <div className="mt-4 p-4">
                <button
                  onClick={handleExit}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Enviar
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuizOfiList;