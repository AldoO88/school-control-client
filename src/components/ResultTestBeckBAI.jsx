import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "../context/student.context";
import testsService from "../services/tests.service";

const ResultTestBeckBAI = ({ answers, category }) => {
  const [score, setScore] = useState(0);
  const [interpretation, setInterpretation] = useState("");
  const { studentId } = useContext(StudentContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    // Suma los valores numéricos seleccionados (0-3 por ítem)
    let total = 0;
    Object.values(answers).forEach((answer) => {
      // Si la opción es un número, úsala directamente, si es string, intenta convertirla
      let value = answer.selectedOption;
      if (typeof value === "string") value = parseInt(value, 10);
      if (!isNaN(value)) total += value;
    });
    setScore(total);

    // Interpretación según la puntuación total BAI
    let interp = "";
    if (total <= 7) {
      interp = "Ansiedad mínima";
    } else if (total <= 15) {
      interp = "Ansiedad leve";
    } else if (total <= 25) {
      interp = "Ansiedad moderada";
    } else {
      interp = "Ansiedad severa";
    }
    setInterpretation(interp);
  }, [answers]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const idStudent = studentId;
      const data = {
        answers: answers,
        result: JSON.stringify({ score, interpretation })
      }
      await testsService.createTest(category, data, idStudent);
      navigate('/socioemotional');
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Error al guardar el resultado");
    }
  }

   return (
    <div className="w-full mb-10 sm:mb-0 sm:w-4/4">
      <div className="relative h-full ml-0 mr-0 sm:mr-10">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-[#bc955b] rounded-lg"></span>
        <form className="relative h-full p-5 bg-white border-2 border-[#bc955b] rounded-lg" onSubmit={handleSubmit}>
          <div className="flex flex-col items-center justify-center -mt-1">
            <h3 className="my-2 ml-3 text-2xl font-bold text-center items-center text-gray-800">
              ¡Gracias por realizar el test!
            </h3>
          
          <p className="mt-3 mb-1 text-xs font-medium text-gray-400 uppercase">
            ------------
          </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <h2 className="font-bold text-2xl text-center text-gray-800">
              {/*Puntuación total: {score}*/}
              Tus respuestas han sido registradas correctamente.
            </h2>
            <h2 className="font-bold text-lg text-center text-gray-700">
              {/*Interpretación: {interpretation}*/}
              La información será utilizada de manera confidencial por el <br/>
              área de Trabajo Social para brindarte una mejor atención y apoyo.
            </h2>
            <p className="mt-3 mb-1 text-xs font-medium text-gray-400 uppercase">
            ------------
           </p>
          </div>
          <div className="flex justify-center">
          <button
            type="submit"
            className="border border-red-900 bg-red-900 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-700 focus:outline-none focus:shadow-outline">
            Guardar
          </button>
          </div>
          
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default ResultTestBeckBAI;