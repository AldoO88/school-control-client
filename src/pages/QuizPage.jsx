import { useParams } from "react-router-dom";
import QuizLynn from "../components/QuizLynn";
import { testLynn } from "../quiz/tests";
import { testPeter } from "../quiz/testPeter";
import { questions } from "../quiz/examDiagnosticOfi"
import QuizOfi from "../components/QuizOfi";

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
        : category === 'ofimatica'
        ? <QuizOfi
          questions={questions}
          category={category}
        />
        : <></>
      
    }
      
    </div>
  )
}

export default QuizPage;