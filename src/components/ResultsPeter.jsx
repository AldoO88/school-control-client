import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import answersService from "../services/answers.service";

const ResultPeter = ({ answers, category }) => {
  const [result, setResult] = useState("");
  const [totals, setTotals] = useState({
    active: 0,
    reflective: 0,
    theoretical: 0,
    pragmatic: 0,
  });

  const { user } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const activeQuestions = [
    3, 5, 7, 9, 13, 20, 26, 27, 35, 37, 41, 43, 46, 48, 51, 61, 67, 74, 75, 77,
  ];
  const reflectiveQuestions = [
    10, 16, 18, 19, 28, 31, 32, 34, 36, 38, 42, 44, 49, 55, 58, 63, 65, 69, 70,
    79,
  ];
  const theoreticalQuestions = [
    2, 4, 6, 11, 15, 17, 21, 23, 25, 29, 33, 45, 50, 54, 60, 64, 66, 71, 78, 80,
  ];
  const pragmaticQuestions = [
    1, 8, 12, 14, 22, 24, 30, 39, 40, 47, 52, 53, 56, 57, 59, 62, 68, 72, 73, 76,
  ];

  useEffect(() => {
    // Aquí podrías calcular el resultado basado en las respuestas
    const activeCount = activeQuestions.filter(
      (num) => answers[num]?.selectedOption === "Si"
    ).length;
    const reflectiveCount = reflectiveQuestions.filter(
      (num) => answers[num]?.selectedOption === "Si"
    ).length;
    const theoreticalCount = theoreticalQuestions.filter(
      (num) => answers[num]?.selectedOption === "Si"
    ).length;
    const pragmaticCount = pragmaticQuestions.filter(
      (num) => answers[num]?.selectedOption === "Si"
    ).length;

    setTotals({
      active: activeCount,
      reflective: reflectiveCount,
      theoretical: theoreticalCount,
      pragmatic: pragmaticCount,
    });

    // Aquí puedes determinar el estilo de aprendizaje predominante
    const maxCount = Math.max(
      activeCount,
      reflectiveCount,
      theoreticalCount,
      pragmaticCount
    );
    let learningStyle = "";

    if (maxCount === activeCount) {
      learningStyle = "ACTIVO";
    } else if (maxCount === reflectiveCount) {
      learningStyle = "REFLEXIVO";
    } else if (maxCount === theoreticalCount) {
      learningStyle = "TEÓRICO";
    } else if (maxCount === pragmaticCount) {
      learningStyle = "PRAGMÁTICO";
    } else if (
      activeCount === reflectiveCount 
    ) {
      learningStyle = "ACTIVO Y REFLEXIVO";
    } else if (
      activeCount === theoreticalCount 
    ) {
      learningStyle = "ACTIVO Y TEÓRICO";
    } else if (
      activeCount === pragmaticCount 
    ) {
      learningStyle = "ACTIVO Y PRAGMÁTICO";
    } else if (
      reflectiveCount === theoreticalCount 
    ) {
      learningStyle = "REFLEXIVO Y TEÓRICO";
    } else if (
      reflectiveCount === pragmaticCount 
    ) {
      learningStyle = "REFLEXIVO Y PRAGMÁTICO";
    } else if (
      theoreticalCount === pragmaticCount 
    ) {
      learningStyle = "TEÓRICO Y PRAGMÁTICO";
    }

    setResult(learningStyle);
  }, [answers]);

  const renderTableData = (questions) => {
    return questions.map((num, index) => (
      <td
        key={index}
        className={
          answers[num]?.selectedOption === "Si"
            ? "text-red-600 border-2 border-indigo-500 text-center"
            : "border-2 border-indigo-500 text-center"
        }>
        {num}
      </td>
    ));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const userId = user._id;
      const data = {
        answers: answers,
        result: result
      }
      await answersService.createAnswers(category, data, userId);
      navigate('/tests');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }

  }

  return (
    <div className="w-full mb-10 sm:mb-0 sm:w-4/4">
      <div className="relative h-full ml-0 mr-0 sm:mr-10">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
        <form className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg" onSubmit={handleSubmit}>
          <div className="flex items-center -mt-1">
            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
              ¡Tu estilo preferido de aprender!
            </h3>
          </div>
          <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
            ------------
          </p>
          <div className="flex flex-row gap-4">
            <table>
              <thead>
                <tr>
                  <th colSpan="5" className="border-2 w-40 border-indigo-500">
                    ACTIVO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>{renderTableData(activeQuestions.slice(0, 5))}</tr>
                <tr>{renderTableData(activeQuestions.slice(5, 10))}</tr>
                <tr>{renderTableData(activeQuestions.slice(10, 15))}</tr>
                <tr>{renderTableData(activeQuestions.slice(15, 20))}</tr>
                <tr>
                  <th colSpan="5" className="border-2 w-40 border-indigo-500">
                    {`TOTAL ${totals.active}`}{" "}
                  </th>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th colSpan="5" className="border-2 w-40 border-indigo-500">
                    REFLEXIVO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>{renderTableData(reflectiveQuestions.slice(0, 5))}</tr>
                <tr>{renderTableData(reflectiveQuestions.slice(5, 10))}</tr>
                <tr>{renderTableData(reflectiveQuestions.slice(10, 15))}</tr>
                <tr>{renderTableData(reflectiveQuestions.slice(15, 20))}</tr>
                <tr>
                  <th colSpan="5" className="border-2 w-40 border-indigo-500">
                    {`TOTAL ${totals.reflective}`}{" "}
                  </th>
                </tr>
              </tbody>
            </table>
            <table>
              <thead>
                <tr>
                  <th colSpan="5" className="border-2 w-40 border-indigo-500">
                    TEÓRICO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>{renderTableData(theoreticalQuestions.slice(0, 5))}</tr>
                <tr>{renderTableData(theoreticalQuestions.slice(5, 10))}</tr>
                <tr>{renderTableData(theoreticalQuestions.slice(10, 15))}</tr>
                <tr>{renderTableData(theoreticalQuestions.slice(15, 20))}</tr>
                <tr>
                  <th
                    colSpan="5"
                    className="border-2 w-40 border-indigo-500">{`TOTAL ${totals.theoretical}`}</th>
                </tr>
              </tbody>
            </table>
            <table className="learning-styles-table">
              <thead>
                <tr>
                  <th colSpan="5" className="border-2 w-40 border-indigo-500">
                    PRAGMÁTICO
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>{renderTableData(pragmaticQuestions.slice(0, 5))}</tr>
                <tr>{renderTableData(pragmaticQuestions.slice(5, 10))}</tr>
                <tr>{renderTableData(pragmaticQuestions.slice(10, 15))}</tr>
                <tr>{renderTableData(pragmaticQuestions.slice(15, 20))}</tr>
                <tr className="total-row">
                  <th colSpan="5" className="border-2 w-40 border-indigo-500">
                    {`TOTAL ${totals.pragmatic}`}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
            ------------
          </p>
          <h2 className="font-bold text-3xl text-center text-green-600">{`${result}!!!`}</h2>
            <button
              type="onSubmit"
              className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
              Salir
            </button>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResultPeter;
