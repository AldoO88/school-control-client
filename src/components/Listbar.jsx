import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

const Listbar = () => {
  const { user } = useContext(AuthContext);


  return (
    <div className="flex flex-col w-64 h-full space-y-2 py-10 px-5 bg-[#C7253E] shadow-lg">
      <div className="flex h-10 items-center justify-center">
        <div className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <svg className="absolute w-12 h-12 text-[#621333] -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
          </svg>
        </div>
      </div>
      <div className="flex flex-col items-center h-20 w-full">
        <h1 className="text-white font-mono">{user.name}</h1>
        <h4 className="text-white font-sans">{user.lastname}</h4>
      </div>

      <div>
        <Link className='inline-flex items-center' to='/tests'>
            <button className="btn-nav">Diagnóstico</button>
        </Link>
      </div>
    </div>

  )
}

export default Listbar;