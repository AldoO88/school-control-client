import { useParams } from "react-router-dom";
import { testLynn } from "../quiz/tests";
import { testPeter } from "../quiz/testPeter";
import { testBeck } from "../quiz/testBeck";
import TestLearningStyle from "../components/TestLearningStyle";
import TestSocioemotional from "../components/TestSocioemotional";

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
      : category === 'Beck'
        ? <TestSocioemotional
          test={testBeck}
          category={category} 
        />
        : <></>

      
    } 
    </div>
  )
}

export default TestPage;