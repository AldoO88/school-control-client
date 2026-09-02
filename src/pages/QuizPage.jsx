import { useParams } from "react-router-dom";
import QuizLearningStyle from "../components/QuizLearningStyle";
import { testLynn } from "../quiz/tests";
import { testPeter } from "../quiz/testPeter";
import { questions as questionsOfimatica } from "../quiz/examDiagnosticOfi";
import { questions as questionsOfi1ro } from "../quiz/quizOfi1ro";
import { questions as questionsOfi2do } from "../quiz/quizOfi2do";
import { questions as questionsOfi3ro } from "../quiz/quizOfi3ro";
import QuizOfi from "../components/QuizOfi";

const ofiQuizConfig = {
  'ofimatica-1RO': {
    questions: questionsOfi1ro,
    title1: 'Quiz de Ofimática - 1RO',
    text: 'Este quiz evalúa tus conocimientos básicos sobre la computadora, sus partes y el uso elemental del equipo.',
    title2: 'Responde con calma y concentración. Tómate tu tiempo para leer cada pregunta antes de elegir una respuesta.',
    instructions: 'Selecciona la respuesta correcta de cada pregunta. Al finalizar verás tu calificación.',
  },
  'ofimatica-2DO': {
    questions: questionsOfi2do,
    title1: 'Quiz de Ofimática - 2DO',
    text: 'Este quiz evalúa tus conocimientos de ofimática básica: Word, Excel y PowerPoint.',
    title2: 'Concéntrate en cada pregunta. Solo tienes un intento para este quiz.',
    instructions: 'Selecciona la respuesta correcta de cada pregunta. Al finalizar verás tu calificación.',
  },
  'ofimatica-3RO': {
    questions: questionsOfi3ro,
    title1: 'Quiz de Ofimática - 3RO',
    text: 'Este quiz evalúa tus conocimientos intermedios y avanzados de ofimática: fórmulas, herramientas y funciones.',
    title2: 'Concéntrate en cada pregunta. Solo tienes un intento para este quiz.',
    instructions: 'Selecciona la respuesta correcta de cada pregunta. Al finalizar verás tu calificación.',
  },
};

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
          questions={questionsOfimatica}
          category={category}
        />
        : ofiQuizConfig[category]
        ? <QuizOfi
            questions={ofiQuizConfig[category].questions}
            category={category}
            title1={ofiQuizConfig[category].title1}
            text={ofiQuizConfig[category].text}
            title2={ofiQuizConfig[category].title2}
            instructions={ofiQuizConfig[category].instructions}
          />
        : <></>
      
    }
      
    </div>
  )
}

export default QuizPage;