import { useParams } from "react-router-dom";
import QuizLearningStyle from "../components/QuizLearningStyle";
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
      ? <QuizLearningStyle
          test={testLynn}
          category={category}
        />
      : category === 'Peter'
        ? <QuizLearningStyle
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