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
               <button className="btn-nav">Inicio</button>
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
            <section className="flex flex-row justify-start ml-28 space-x-4 w-1/3">
              <Link className='inline-flex items-center' to='/'>
              <button className="btn-nav">Inicio</button>
              </Link>
              <Link className='inline-flex items-center' to='/tests'>
                <button className="btn-nav">Diagnóstico</button>
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