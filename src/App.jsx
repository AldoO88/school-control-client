import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Home from './pages/Home'
import { AuthContext } from './context/auth.context'
import { useContext } from 'react'
import Tests from './pages/Tests'
import Listbar from './components/Listbar'
import QuizPage from './pages/QuizPage'
import IsPrivate from './components/IsPrivate'
import IsAnonymous from './components/IsAnonymous'
import Sidebar from './components/Sidebar'

function App() {
  const { isLoggedIn } = useContext(AuthContext)

  return (
    <>
      <Navbar />
      <div className='flex flex-row h-full w-full m-0 p-0'>
        {
          isLoggedIn && 
            <div>
              <Sidebar/>
            </div>
        }
        <div className='flex items-start justify-center h-full w-full px-5 m-10 sm:px-0'>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/tests' element={ <IsPrivate><Tests/></IsPrivate> } />
            <Route path='/tests/:category' element={ <IsPrivate><QuizPage/></IsPrivate> } />
            <Route path='/signup' element={ <IsAnonymous><Signup/></IsAnonymous> } />
            <Route path='/login' element={ <IsAnonymous><Login/></IsAnonymous> } />
          </Routes>
        </div>
      </div>
    </>
  )
}

export default App
