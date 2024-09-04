import CardTest from "./CardTest"
import { testLynn } from "../quiz/tests"
import { testPeter } from "../quiz/testPeter"
//import answersService from "../services/answers.service"
//import { AuthContext } from "../context/auth.context"
//import { useContext, useEffect, useState } from "react"

const TestsList = () => {
  //const [answeredTest, setAnsweredTest] = useState([]);
  //const { user } = useContext(AuthContext);

 // const getAnsweredTest = async () => {
   // try {
    //  const idUser = user._id;
      //console.log(answersService); 
      //const response = await answersService.getAnsweredTest(idUser);
      //const data = response.data;
      //setAnsweredTest(data);
    //} catch (error) {
      //console.error(error);
    //}
 // }

  //useEffect(() => {
    //getAnsweredTest();
  //}, [])

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