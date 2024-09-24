import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import answersService from "../services/answers.service";

const ResultsExam = ({ score, answers, category }) => {
  const [ calif, setCalif ] = useState(0.0);
  const { user } = useContext(AuthContext);
  const [ errorMessage, setErrorMessage ] = useState(undefined);

  const navigate = useNavigate();

  const calculateCalif = (score) => {
    const calculate = (score * 10) / 40;
    if (calculate < 5) {
      return setCalif(5.0);
    }
    setCalif(calculate);
  };

  useEffect(() => {
    calculateCalif(score);
  }, [score]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = user._id;
      const data = {
        answers: answers,
        result: calif
      }
      await answersService.createAnswers(category, data, userId);
      navigate('/tests');
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }

  };

  return (
    <div className="w-full mb-10 sm:mb-0 sm:w-4/4">
      <div className="relative h-full ml-0 mr-0 sm:mr-10">
        <span className="absolute top-0 left-0 w-full h-full mt-1 ml-1 bg-blue-400 rounded-lg"></span>
        <form
          className="relative h-full p-5 bg-white border-2 border-blue-400 rounded-lg"
          onSubmit={handleSubmit}>
          <div className="flex items-center -mt-1 my-4">
            <h1 className="my-2 ml-3 text-lg font-bold text-gray-800">
              ¡Tu calificación es:!
            </h1>
          </div>
          <div className="flex flex-col items-center my-2">
            {calif >= 8 ? (
              <>
                <h1 className="font-bold text-3xl text-center text-green-600 py-4">
                  ¡Felicidades!
                </h1>
                <h1 className="font-bold text-6xl text-center text-green-600 py-4">
                  {" "}
                  {calif}
                </h1>
              </>
            ) : calif >= 6 && calif < 8 ? (
              <>
                <h1 className="font-bold text-3xl text-center text-yellow-500 py-4">
                  ¡Aprobaste!
                </h1>
                <h1 className="font-bold text-6xl text-center text-yellow-500 py-4">
                  {calif}
                </h1>
              </>
            ) : (
              <>
              <h1 className="font-bold text-3xl text-center text-red-700 py-4">
                  ¡No te preocupes, sigue intentando!
                </h1>
              <h1 className="font-bold text-6xl text-center text-red-700 py-4">
                {calif}
              </h1>
              </>
            )}
              

            <button
              type="onSubmit"
              className="border border-red-500 bg-red-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:bg-red-600 focus:outline-none focus:shadow-outline">
              Guardar
            </button>
            {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResultsExam;
