import { useParams } from "react-router-dom";
import QuizLynn from "../components/QuizLynn";
import { testLynn } from "../quiz/tests";
import { testPeter } from "../quiz/testPeter";

const QuizPage = () => {
  const { category } = useParams();
  return (
    <div>
    {
      category === 'Lynn'
      ? <QuizLynn
          test={testLynn}
          category={category}
        />
      : category === 'Peter'
      ? <QuizLynn
          test={testPeter}
          category={category}
        />
      : <></>
      
    }
      
    </div>
  )
}

export default QuizPage;