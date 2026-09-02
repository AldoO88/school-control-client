import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { AuthContext } from "./context/auth.context";
import { useContext } from "react";
import Tests from "./pages/Tests";
import QuizPage from "./pages/QuizPage";
import IsPrivate from "./components/IsPrivate";
import IsAnonymous from "./components/IsAnonymous";
import Sidebar from "./components/Sidebar";
import StudentRegister from "./pages/StudentRegister";
import { StudentProvider } from "./context/student.context";
import TestsTec47 from "./pages/TestsTec47";
import TestPage from "./pages/TestPage";
import TestResults from "./pages/TestsResults";
import TestsTec47Emocional from "./pages/TestsTec47Emocional";
import Footer from "./components/Footer";
import StudentsList from "./components/StudentList";
import QuizOfiPage from "./pages/QuizOfiPage";
import QuizOfiTeacherPage from "./pages/QuizOfiTeacherPage";

function App() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <StudentProvider>
        <Navbar />
        <div className="flex flex-row h-full w-full m-0 p-0">
          {isLoggedIn && (
            <div>
              <Sidebar />
            </div>
          )}
          <div className="flex items-start justify-center h-full w-full px-5 m-10 sm:px-0">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register/evaluations" element={<StudentRegister tipo='estilos'/>} />
              <Route path="/register/socioemotional" element={<StudentRegister tipo='socioemocional'/>} />
              <Route path="/register/ofimatica" element={<StudentRegister tipo='ofimatica'/>} />
              <Route path="/evaluations" element={<TestsTec47 />} />
              <Route path="/evaluations/:category" element={<TestPage />} />
              <Route path="/evaluations/testsresults" element={<TestResults />} />
              <Route path="/socioemotional" element={<TestsTec47Emocional />} />
              <Route path="/socioemotional/:category" element={<TestPage />} />
              <Route path="/results" element={<StudentsList />} />
              <Route path="/quizz" element={<QuizOfiPage />} />
              <Route path="/quizz/:category" element={<QuizPage />} />
              <Route
                path="/quizz/teacher"
                element={<IsPrivate> <QuizOfiTeacherPage /> </IsPrivate>}
              />
              <Route
                path="/tests"
                element={<IsPrivate> <Tests /> </IsPrivate>}
              />
              <Route
                path="/tests/:category"
                element={
                  <IsPrivate>
                    <QuizPage />
                  </IsPrivate>
                }
              />
              <Route
                path="/signup"
                element={
                  <IsAnonymous>
                    <Signup />
                  </IsAnonymous>
                }
              />
              <Route
                path="/login"
                element={
                  <IsAnonymous>
                    <Login />
                  </IsAnonymous>
                }
              />
            </Routes>
          </div>
        </div>
        <Footer />
      </StudentProvider>
    </>
  );
}

export default App;
