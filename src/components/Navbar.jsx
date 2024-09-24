import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

const Navbar = () => {

  const { isLoggedIn, logout } = useContext(AuthContext)

  return (
    <nav className="flex flex-row flex-nowrap justify-center space-x-2 py-6 bg-[#621333]">
      {
        !isLoggedIn && (
          <>
            <section className="flex flex-row justify-start ml-28 space-x-4 w-1/3">
              <Link className='inline-flex items-center' to='/'>
                <button className="btn-nav">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                  </svg>
                </button>
              </Link>
              <Link className='inline-flex items-center' to='/register'>
              <a className="btn-nav">
                Evaluación Diagnóstica
              </a>
              </Link>
            </section>
            <section className="flex flex-row justify-evenly space-x-4 w-1/3">

            </section>
            <section className="flex flex-row justify-center space-x-4 w-1/3 h-10">
              <Link className="inline-flex items-center" to='/signup'>
                <button className="btn-nav">Crea tu cuenta</button>
              </Link>
              <Link className="w-full max-w-24 h-full max-h-10" to='/login'>
                <button className="font-semibold text-base bg-[#E85C0D] rounded-lg text-white w-full max-w-24 h-full max-h-10 hover:bg-[#FABC3F]">Ingresa</button>
              </Link>
        
            </section>
          </>
        )
      }
      {
        isLoggedIn && (
          <>
            <section className="flex flex-row justify-start ml-28 space-x-16 w-1/3">
              <Link className='inline-flex items-center' to='/'>
              <button className="btn-nav">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                </svg>
              </button>
              </Link>
              
            </section>
            <section className="flex flex-row justify-evenly space-x-4 w-1/3">

            </section>
            <section className="flex flex-row justify-center space-x-4 w-1/3 h-10">
              <Link 
                className="inline-flex justify-end items-center w-36" to='/'>
                <button 
                  onClick={logout}
                  className="flex flex-row justify-center items-center font-semibold text-base bg-[#E85C0D] rounded-lg text-white w-36 h-10 hover:bg-[#FABC3F]">
                  Cerrar Sesión
                </button>
              </Link>
        
            </section>
          </>
        )
      }
      
    </nav>
  )
}

export default Navbar;