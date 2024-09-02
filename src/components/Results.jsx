import { useEffect, useState } from "react";

const Results = ({ answers }) => {
  const [loadAnswers, setLoadAnswers] = useState(answers);
  const [result, setResult] = useState("");

  const visualQuestions = [1, 5, 9, 10, 11, 16, 17, 22, 26, 27, 32, 36];
  const auditivoQuestions = [2, 3, 12, 13, 15, 19, 20, 23, 24, 28, 29, 33];
  const kinestesicoQuestions = [4, 6, 7, 8, 14, 18, 21, 25, 30, 31, 33, 34, 35];

  const addTotal = (questions) => {
    return questions.reduce((acc, questionNumber) => {
      const answer = loadAnswers[questionNumber];
      if (!answer) {
        return acc;
      }
      return acc + answer.selectedIndex
    }, 0);
  }

  const calculateResult = () => {
    const visualTotal = addTotal(visualQuestions);
    const auditivoTotal = addTotal(auditivoQuestions);
    const kinestesicoTotal = addTotal(kinestesicoQuestions);

    if (visualTotal > auditivoTotal && visualTotal > kinestesicoTotal) {
      return "Visual";
    } else if (auditivoTotal > visualTotal && auditivoTotal > kinestesicoTotal) {
      return "Auditivo";
    } else if (kinestesicoTotal > visualTotal && kinestesicoTotal > auditivoTotal) {
      return "Kinestésico";
    } else {
      return "Mixto";
    }
  };

  useEffect(() => {
    const finalResult = calculateResult();
    setResult(finalResult);
  }, [loadAnswers]);

  const renderTableRows = (questions) => {
    return questions.map((questionNumber) => (
      <tr key={questionNumber}>
        <td colSpan="2" className="border-2 border-indigo-500 text-center">
          {questionNumber}
        </td>
        <td colSpan="2" className="border-2 border-indigo-500 text-center">
          {loadAnswers[questionNumber]?.selectedOption.substr(0, 1) ||
            "No respondida"}
        </td>
      </tr>
    ));
  };

  return (
    <div className="w-full mb-10 sm:mb-0 sm:w-4/4">
      <div className="relative h-full ml-0 mr-0 sm:mr-10">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
        <div className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg">
          <div className="flex items-center -mt-1">
            <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">
              Tu canal o estilo de aprendizaje!!!
            </h3>
          </div>
          <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
            ------------
          </p>
          <div className="flex flex-row gap-4">
            <table border="1" className="border-2">
              <tbody className="border-2">
                <tr>
                  <th colSpan="2" className="border-2 w-28 border-indigo-500">
                    Pregunta
                  </th>
                  <th colSpan="2" className="border-2 w-28 border-indigo-500">
                    Respuesta
                  </th>
                </tr>
                {renderTableRows(visualQuestions)}
                <tr>
                  <th colSpan="2" className="border-2 border-indigo-500">
                    VISUAL
                  </th>
                  <th colSpan="2" className="border-2 border-indigo-500">
                    {addTotal(visualQuestions)}
                  </th>
                </tr>
              </tbody>
            </table>

            <table border="1">
              <tbody className="border-2">
                <tr>
                  <th colSpan="2" className="border-2 w-28 border-indigo-500">
                    Pregunta
                  </th>
                  <th colSpan="2" className="border-2 w-28 border-indigo-500">
                    Respuesta
                  </th>
                </tr>
                {renderTableRows(auditivoQuestions)}
                <tr>
                  <th colSpan="2" className="border-2 border-indigo-500">
                    AUDITIVO
                  </th>
                  <th colSpan="2" className="border-2 border-indigo-500">
                  {addTotal(auditivoQuestions)}
                  </th>
                </tr>
              </tbody>
            </table>
            <table border="1" className="border-2">
              <tbody className="border-2">
                <tr>
                  <th colSpan="2" className="border-2 w-28 border-indigo-500">
                    Pregunta
                  </th>
                  <th colSpan="2" className="border-2 w-28 border-indigo-500">
                    Respuesta
                  </th>
                </tr>
                {renderTableRows(kinestesicoQuestions)}

                <tr>
                  <th colSpan="2" className="border-2 border-indigo-500">
                    KINESTÉSICO
                  </th>
                  <th colSpan="2" className="border-2 border-indigo-500">
                    {addTotal(kinestesicoQuestions)}
                  </th>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
            ------------
          </p>
          <h2 className="font-bold text-3xl text-center text-green-600">{`${result}!!!`}</h2>

        </div>
      </div>
    </div>
  );
};

export default Results;
