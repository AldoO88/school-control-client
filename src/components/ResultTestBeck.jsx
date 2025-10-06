import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/student.context";
import testsService from "../services/tests.service";

const ResultsTestBeck = ({ answers, category }) => {
  const [score, setScore] = useState(0);
  const [interpretation, setInterpretation] = useState("");
  const { studentId } = useContext(StudentContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Suma los valores numéricos de cada respuesta seleccionada
    let total = 0;
    Object.values(answers).forEach((answer) => {
      // Extrae el número al inicio de la respuesta seleccionada (ej: "2 Me siento triste todo el tiempo.")
      const match = answer.selectedOption.match(/^(\d+)/); // Busca un número al inicio de la cadena
      if (match) {
        total += parseInt(match[1], 10); // Convierte el número a entero y lo suma al total 
      }
    });
    setScore(total);

    // Interpretación según la puntuación total (puedes ajustar los rangos si lo deseas)
    let interp = "";
    if (total <= 13) {
      interp = "Mínima o sin depresión";
    } else if (total <= 19) {
      interp = "Depresión leve";
    } else if (total <= 28) {
      interp = "Depresión moderada";
    } else {
      interp = "Depresión grave";
    }
    setInterpretation(interp);
  }, [answers]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const idStudent = studentId;
      const data = {
        answers: answers,
        result: JSON.stringify({score, interpretation})
      }
      await testsService.createTest(category, data, idStudent);
      navigate('/socioemotional');
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
              Resultado del Inventario de Depresión de Beck
            </h3>
          </div>
          <p className="mt-3 mb-1 text-xs font-medium text-blue-400 uppercase">
            ------------
          </p>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-bold text-3xl text-center text-green-600">
              Puntuación total: {score}
            </h2>
            <h2 className="font-bold text-2xl text-center text-blue-600">
              Interpretación: {interpretation}
            </h2>
          </div>
          <button
            type="submit"
            className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
            Guardar
          </button>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResultsTestBeck;