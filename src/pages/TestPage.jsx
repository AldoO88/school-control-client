import { useParams } from "react-router-dom";
import { testLynn } from "../quiz/tests";
import { testPeter } from "../quiz/testPeter";
import TestLearningStyle from "../components/TestLearningStyle";

const TestPage = () => {
  const { category } = useParams();
  return (
    <div>
    {
      category === 'Lynn'
      ? <TestLearningStyle
          test={testLynn}
          category={category}
        />
      : category === 'Peter'
        ? <TestLearningStyle
          test={testPeter}
          category={category}
        />
        : <></>
      
    }
      
    </div>
  )
}

export default TestPage;