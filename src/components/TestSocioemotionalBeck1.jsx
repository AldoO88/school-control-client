import { useState } from "react";
import { Link } from "react-router-dom";
import InstructionsBeck1 from "./InstructionesBeck1";
import ResultsTestBeckBAI from "./ResultTestBeckBAI";

const TestSocioemotionalBeck1 = ({ test, category }) => {
  const [answers, setAnswers] = useState({});
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [finished, setFinished] = useState(false);

  const handleAnswerChange = (questionId, option, oIndex) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        selectedOption: option,
        selectedIndex: oIndex,
      },
    }));
  };

  const handleFinishQuiz = () => {
    if (Object.keys(answers).length < test.questions.length) {
      alert('Por favor responde todas las preguntas');
      return;
    }
    setFinished(true);
  };

  const resetQuiz = () => {
    setAnswers({});
    setFinished(false);
    setActiveQuiz(false);
  };

  // Determina las opciones (para Beck1: test.options)
  const options = test.options && Array.isArray(test.options)
    ? test.options
    : [0, 1, 2, 3];

  return (
    <div>
      {!finished ? (
        activeQuiz ? (
          test.questions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full border border-gray-300 rounded-lg shadow-lg">
                <thead>
                  <tr className="bg-indigo-500 text-white">
                    <th className="border px-2 py-2 text-left">#</th>
                    <th className="border px-2 py-2 text-left">Pregunta</th>
                    {options.map((option, idx) => (
                      <th key={idx} className="border px-2 py-2 text-center">{option}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {test.questions.map((question, qIndex) => (
                    <tr
                      key={question.id + qIndex}
                      className={qIndex % 2 === 0 ? "bg-gray-100" : "bg-white"}
                    >
                      <td className="border px-2 py-2 text-center font-semibold text-indigo-700">{question.id}</td>
                      <td className="border px-2 py-2">{question.question}</td>
                      {options.map((option, oIndex) => (
                        <td key={oIndex} className="border px-2 py-2 text-center">
                          <input
                            type="radio"
                            id={`question-${question.id}-option-${oIndex}`}
                            name={`question-${question.id}`}
                            value={option}
                            checked={answers[question.id]?.selectedIndex === oIndex}
                            onChange={() =>
                              handleAnswerChange(question.id, option, oIndex)
                            }
                            className="w-4 h-4 text-green-600 accent-indigo-500"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex flex-row justify-between mt-4">
                <div>
                  <Link to="/socioemotional">
                    <button
                      type="button"
                      className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
                      Salir
                    </button>
                  </Link>
                  <button
                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    onClick={resetQuiz}>
                    Reiniciar Test
                  </button>
                </div>
                <div className="flex flex-row justify-end">
                  <button
                    className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                    onClick={handleFinishQuiz}>
                    Terminar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <p>Loading questions...</p>
          )
        ) : (
          <InstructionsBeck1
            title1={test.title1}
            instructions={test.instructions}
            options={test.options}
            text2={test.text2}
            setActiveQuiz={setActiveQuiz}
          />
        )
      ) : (
        <ResultsTestBeckBAI
          answers={answers}
          category={category}
        />
      )}
    </div>
  );
};

export default TestSocioemotionalBeck1;