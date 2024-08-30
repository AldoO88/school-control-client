import { useParams } from "react-router-dom";
import QuizLynn from "../components/QuizLynn";




const QuizPage = () => {

  const { category } = useParams();


  return (
    <div>
    {
      category === 'Lynn'
      ? <QuizLynn/>
      : category === 'Peter'
      ? <h1>Quiz de Peter</h1>
      : <></>
      
    }
      
    </div>
  )
}

export default QuizPage;