import { testLynn } from "../quiz/tests";
import { testPeter } from "../quiz/testPeter";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../context/student.context";
import testsService from "../services/tests.service";

const TestsListTec47 = () => {
  const [answeredTestLynn, setAnsweredTestLynn] = useState(undefined);
  const [answeredTestPeter, setAnsweredTestPeter] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const { studentId, clearStudentId } = useContext(StudentContext);

  const navigate = useNavigate();

  const getAnsweredTest = async () => {
    try {
      setLoading(true);
      const idStudent = studentId;
      const response = await testsService.getAnsweredTest(idStudent);
      const data = response.data;
      data.map((test) => {
        if (test.test === "Lynn") {
          return setAnsweredTestLynn(test);
        } else if (test.test === "Peter") {
          return setAnsweredTestPeter(test);
        }
        return null;
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAnsweredTest();
  }, []);

  const hanleSalir = () => {
    clearStudentId();
    navigate("/");
  };

  return (
    <div className="flex flex-row gap-6">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Título
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Categoria
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Estatus
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Resultado
                  </th>

                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {testLynn.title1}
                  </th>
                  <td className="px-6 py-4">Estilos de aprendizaje</td>
                  {answeredTestLynn ? (
                    <>
                      <td className="px-6 py-4">
                        <span className="inline-flex h-8 w-20 font-bold bg-green-300 items-center text-red-700 justify-center rounded-lg">
                          Realizado
                        </span>
                      </td>
                      <td className="px-6 py-4 font-bold text-rose-800 hover:underline">
                        {answeredTestLynn.result}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link
                          disabled
                          to=""
                          className="cursor-not-allowed opacity-30 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Realizar
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10">
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
                          to={testLynn.category}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Realizar
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10">
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
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {testPeter.title1}
                  </th>
                  <td className="px-6 py-4">Estilos de aprendizaje</td>
                  {answeredTestPeter ? (
                    <>
                      <td className="px-6 py-4">
                        <span className="inline-flex h-8 w-20 font-bold bg-green-300 items-center text-red-700 justify-center rounded-lg">
                          Realizado
                        </span>
                      </td>
                      <Link to="" className="">
                        <td className="px-6 py-6 font-bold text-rose-800 hover:underline">
                          {answeredTestPeter.result}
                        </td>
                      </Link>
                      <td className="px-6 py-4 text-right">
                        <Link
                          disabled
                          to=""
                          className="cursor-not-allowed opacity-30 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Realizar
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10">
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
                          to={testPeter.category}
                          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                          Realizar
                          <svg
                            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 10">
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
              </tbody>
            </table>
            <div className="mt-4">
              {answeredTestLynn && answeredTestPeter && (
                <button
                  onClick={hanleSalir}
                  className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Enviar
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TestsListTec47;
