import CardTest from "../components/CardTest"
import { tests } from "../quiz/tests"

const Tests = () => {

  return (
    <div className="flex flex-row gap-6">
    {tests.map((test, index) => (
    
      <CardTest 
        key={index}
        title={test.title1}
        description={test.title2}
        category={test.category}
      />
      
    ))}
    
    </div>
  )
}

export default Tests