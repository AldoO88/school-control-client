import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstructionsExam from "./InstructionsExam";
import ResultsExam from "./ResultsExam";

const test = {
  title1: 'Examen Diagnóstico de Ofimática',
    text: 'Este examen tiene como objetivo conocer tu nivel de conocimientos en ofimática, para poder ofrecerte un curso que se adapte a tus necesidades.',
    title2: 'Es muy importante que estes concentrado y no te distraigas. Tomate el tiempo necesario para responder cada pregunta.',
    instructions: 'Selecciona la respuesta correcta de cada pregunta. Al finalizar el examen podrás ver tu calificación.',
  }


const QuizOfi = ( { questions, category } ) => {
  const [questionsGroup, setQuestionsGroup] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  
  const batchSize = 10;

  useEffect(() => {
    const startIndex = currentBatch * batchSize;
    const endIndex = startIndex + batchSize;
    const selectedQuestions = questions.slice(startIndex, endIndex);

    // Crear una lista de respuestas combinadas y barajarlas
    const updatedQuestions = selectedQuestions.map((question) => {
      const allAnswers = [
        ...question.incorrect_answers,
        question.correct_answer,
      ].sort(() => Math.random() - 0.5); // Barajar respuestas

      return {
        ...question,
        allAnswers,
      };
    });

    setQuestionsGroup(updatedQuestions);
  }, [currentBatch, questions]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswered((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        selectedOption: answer,
        selectedIndex: 1
      }
    }));

    // Incrementar la puntuación si la respuesta es correcta
    const currentQuestion = questions.find((q) => q.id === questionId);
    if (currentQuestion.correct_answer === answer) {
      setScore((prevScore) => prevScore + 1);
    }
  };

  const handleNextBatch = () => {
    if ((currentBatch + 1) * batchSize < questions.length) {
      setCurrentBatch((prevBatch) => prevBatch + 1);
    } else {
      console.log("Quiz finished");
      console.log(answered);
      // Aquí podrías enviar las respuestas al servidor, mostrar un resumen, etc.
    }
  };

  const handlePreviousBatch = () => {
    if (currentBatch > 0) {
      setCurrentBatch((prevBatch) => prevBatch - 1);
    }
  };

  const handleFinishQuiz = () => {
    if (Object.keys(answered).length < questions.length) {
      alert("Por favor responde todas las preguntas");
      return;
    }
    console.log(answered);
    setFinished(true);
  };

  const resetQuiz = () => {
    setAnswered({});
    setCurrentBatch(0);
    setFinished(false);
    setActiveQuiz(false);
  };

  return (
    <div>
      {!finished ? (
        activeQuiz ? (
          questionsGroup.length > 0 ? (
            <div>
              {questionsGroup.map((question) => (
                <div key={question.id} className="w-full mb-10 sm:mb-0 sm:w-2/2 p-2 justify-center">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">{`${question.id}.- ${question.question}`}</h3>
                      </div>
                      <div className="flex flex-row">
                        {question.allAnswers.map((answer, oIndex) => (
                          <div key={oIndex} className="mx-4">
                            <input
                              type="radio"
                              id={`question-${question.id}-${oIndex}`}
                              name={`question-${question.id}`}
                              value={answer}
                              checked={answered[question.id]?.selectedOption === answer}
                              onChange={() =>
                                handleAnswerChange(question.id, answer)
                              }
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor={`question-${question.id}-${oIndex}`}
                              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                              {answer}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex flex-row justify-between">
                <div>
                  <Link to="/tests">
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
                  {currentBatch > 0 && (
                    <button
                      type="button"
                      className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline"
                      onClick={handlePreviousBatch}>
                      Anterior
                    </button>
                  )}
                  {(currentBatch + 1) * batchSize < questions.length ? (
                    <button
                      className="border border-yellow-500 bg-yellow-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-yellow-600 focus:outline-none focus:shadow-outline"
                      onClick={handleNextBatch}>
                      Siguiente
                    </button>
                  ) : (
                    <button
                      className="border border-green-500 bg-green-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-green-600 focus:outline-none focus:shadow-outline"
                      onClick={handleFinishQuiz}>
                      Terminar
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <p>Loading questions...</p>
          )
        ) : (
          <InstructionsExam
            title1={test.title1}
            text={test.text}
            title2={test.title2}
            instructions={test.instructions}
            setActiveQuiz={setActiveQuiz}
          />
        )
      ) :  
          <ResultsExam
            score={score}
            answers={answered}
            category={category}
          />
      }
    </div>
  );
};

export default QuizOfi;