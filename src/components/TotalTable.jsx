import { useEffect, useState } from "react";
import testsService from "../services/tests.service"

const TotalTable = () => {
  const [resultTotal, setResultTotal ] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const getTotalResults = async () => {
    try {
      const response = await testsService.getTotalTest();
      const data = response.data;
      setResultTotal(data);
     
    } catch (error) {
      setErrorMessage("Error al obtener los resultados");
    }finally{
      setLoading(false);
    }
  }

  useEffect(() => {
    getTotalResults();
  }, []);
  
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    {
      loading 
      ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) 
      : ( 
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th rowSpan="2" scope="col" className="px-6 py-3">GRADO Y GRUPO</th>
            <th colSpan="3" scope="col" className="px-6 py-3 text-center">LYNN OBRIEN</th>
            <th colSpan="4" scope="col" className="px-6 py-3 text-center">HONEY-ALONSO</th>
          </tr>
          <tr>
            <th scope="col" className="px-6 py-3">AUDITIVO</th>
            <th scope="col" className="px-6 py-3">VISUAL</th>
            <th scope="col" className="px-6 py-3">KINESTÉSICO</th>
            <th scope="col" className="px-6 py-3">ACTIVO</th>
            <th scope="col" className="px-6 py-3">REFLEXIVO</th>
            <th scope="col" className="px-6 py-3">TEÓRICO</th>
            <th scope="col" className="px-6 py-3">PRAGMÁTICO</th>
          </tr>
        </thead>
        <tbody>
        {
          resultTotal.map((result, index) => (
            <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              key={index}>
            <td scope="row"
                  className="font-medium text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 px-6 py-4">{result.grade} {result.group}</td>
            <td className="text-center">{result.auditory}</td>
            <td className="text-center">{result.visual}</td>
            <td className="text-center">{result.kinesthetic}</td>
            <td className="text-center">{result.active}</td>
            <td className="text-center">{result.reflexive}</td>
            <td className="text-center">{result.theoretical}</td>
            <td className="text-center">{result.pragmatic}</td>
          </tr>

            </>
          ))
        }
          
         
          <tr className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <td scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">TOTAL</td>
            <td>136</td>
            <td>239</td>
            <td>151</td>
            <td>124</td>
            <td>148</td>
            <td>115</td>
            <td>87</td>
          </tr>
        </tbody>
      </table>
      )
    }
    {errorMessage && <p className="text-red-800">{errorMessage}</p>}
    </div>
  )
}

export default TotalTable;