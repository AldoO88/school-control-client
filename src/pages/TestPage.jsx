import { useParams } from "react-router-dom";
import { testLynn } from "../quiz/tests";
import { testPeter } from "../quiz/testPeter";
import { testBeck } from "../quiz/testBeck2";
import { testBeck1 } from "../quiz/testBeck1";
import TestLearningStyle from "../components/TestLearningStyle";
import TestSocioemotional from "../components/TestSocioemotional";
import TestSocioemotionalBeck1 from "../components/TestSocioemotionalBeck1";

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
        : category === 'Beck1'
        ? <TestSocioemotionalBeck1
          test={testBeck1}
          category={category} 
        />
        :<></>

      
    } 
    </div>
  )
}

export default TestPage;