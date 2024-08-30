import CardTest from "./CardTest"
import { testLynn } from "../quiz/tests"
import { testPeter } from "../quiz/testPeter"

const TestsList = () => {

  return (
    <div className="flex flex-row gap-6">
    
      <CardTest 
        title={testLynn.title1}
        description={testLynn.title2}
        category={testLynn.category}
      />

      <CardTest 
        title={testPeter.title1}
        description={testPeter.title2}
        category={testPeter.category}
      />
      
    </div>
  )
}

export default TestsList