import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import InstructionsExam from "./InstructionsExam";

const test = {
  title1: 'Test de Estilos de Aprendizaje de Lynn O\'Brien',
    text: 'Las personas aprendemos de forma diferente, de acuerdo a los sentidos que consideramos nos son más útiles al recibir, procesar y responder   ante la información que captamos del medio. Son estas diferencias entre unos y otros las que nos hacen únicos y se pueden observar en la forma, la velocidad, la facilidad y/o dificultad para aprender un teléfono, un nombre, un ejercicio, una teoría, un valor o una estrategia. De acuerdo a esto, en un salón de clase podemos encontrar estudiantes que captan las ideas y entienden fácilmente con sólo escuchar una vez, otros requieren de imágenes visuales que les permita hacer un mapa mental, y otros aprenden mejor por su cuenta y mucho más si pueden utilizar el arte como apoyo. Estas situaciones se dan porque a medida que avanzamos en nuestra historia escolar, desarrollamos diferentes estilos de aprendizaje.',
    title2: 'Conoce tu estilo o canal de aprendizaje realizando el siguiente cuestionario:',
    instructions: 'Lee cuidadosamente cada oración y piensa de qué manera se aplica a ti. En cada línea escribe el número que mejor describe tu reacción a cada oración.',
  }


const QuizOfi = ( { questions, category} ) => {
  const [questionsOfi, setQuestionsOfi] = useState([]);
  const [answered, setAnswered] = useState([]);
  const [answerRandom, setAnswerRandom] = useState([])
  const [currentBatch, setCurrentBatch] = useState(0);
  const [activeQuiz, setActiveQuiz] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  
  const batchSize = 10;

  useEffect(() => {
    console.log(questions)
    const answers = [
      ...questions.incorrect_answers,
       questions.cotterct_answer 
    ];
    const startIndex = currentBatch * batchSize;
    const endIndex = startIndex + batchSize;
    setQuestionsOfi(questions.slice(startIndex, endIndex));
    setAnswerRandom(answers.sort(() => Math.random() - 0.5));
  }, [currentBatch, questions ]);

  const handleAnswerChange = (questionId, answer, index) => {
    setAnswered((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        selectedOption: answer,
        selectedIndex: index + 1,
      },
    }));
    if (answer === questions.correct_answer) {
			setScore(score + 1);
		}
  };

  const handleNextBatch = () => {
    if ((currentBatch + 1) * batchSize < questions.length) {
      setCurrentBatch(currentBatch + 1);
    } else {
      console.log("Quiz finished");
      console.log(answered);
      // Aquí podrías enviar las respuestas al servidor, mostrar un resumen, etc.
    }
  };

  const handlePreviousBatch = () => {
    if (currentBatch > 0) {
      setCurrentBatch(currentBatch - 1);
    }
  };

  const handleFinishQuiz = () => {
   if(Object.keys(answered).length < questions.length){
    alert('Por favor responde todas las preguntas');
    return;
   }
    console.log(answered);

    setFinished(true);
  };

  const resetQuiz = () => {
    setAnswered([]);
    setCurrentBatch(0);
    setFinished(false);
    setActiveQuiz(false);
  };

    return (
      <div>
      {!finished ? (
        activeQuiz ? (
          questionsOfi.length > 0 ? (
            <div className="">
              {questionsOfi.map((question) => (
                <div
                  key={question.id}
                  className="w-full mb-10 sm:mb-0 sm:w-2/2 p-2 justify-center">
                  <div className="relative h-full ml-0 mr-0 sm:mr-10">
                    <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-indigo-500 rounded-lg"></span>
                    <div className="relative h-full p-5 bg-white border-2 border-indigo-500 rounded-lg ">
                      <div className="flex items-center -mt-1">
                        <h3 className="my-2 ml-3 text-lg font-bold text-gray-800">{`${question.id}.- ${question.question}`}</h3>
                      </div>
                      <div className="flex flex-row">
                        {answerRandom.map((answer, oIndex) => (
                          <div key={oIndex} className="mx-4">
                            <input
                              type="radio"
                              id={`question-${question.id}`}
                              name={`question-${question.id}`}
                              value={answer}
                              checked={
                                answerRandom[question.id]?.selectedOption === answer
                              }
                              onChange={() =>
                                handleAnswerChange(question.id, answer, oIndex)
                              }
                              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                            />
                            <label
                              htmlFor={`question-${question.id}`}
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
                  {(currentBatch + 1) * batchSize < test.questions.length ? (
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
            text2={test.text2}
            setActiveQuiz={setActiveQuiz}
          />
        )
      ) : category === "Lynn" ? (
        <></>
        
      ) : (
        <></>
      )}
    </div>
  );
    
}

export default QuizOfi;