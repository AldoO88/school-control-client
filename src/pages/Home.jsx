import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { Link } from "react-router-dom";

const Home = () => {

  const { isLoggedIn, logout } = useContext(AuthContext)

  return (
    /*<div>
    {
      isLoggedIn && (
        <>
          <h1>Usuario logueado</h1>
        </>
      )
    }
    {
      !isLoggedIn && (
        <>
        <h1>Home Page</h1>
        </>
      )
    }
    </div>
    */

<div className="min-h-screen flex flex-col bg-gray-50">
    <header className="bg-[#621333] text-white py-8 shadow-lg">
      <div className="container mx-auto px-4 flex flex-col items-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">
          Bienvenidos a la Escuela Secundaria Técnica No. 47
        </h1>
        <p className="text-lg md:text-xl text-center">
          Plataforma de control escolar y orientación socioemocional
        </p>
      </div>
    </header>

    <main className="flex-1 flex flex-col items-center justify-center px-4">
      <section className="bg-white rounded-lg shadow-md p-8 mt-8 max-w-xl w-full">
      <div className="absolute inset-0 bg-[url('./public/images/tecnica47_img.png')] bg-cover bg-center opacity-20 pointer-events-none rounded-lg" />
      <div className="relative z-10">
        <h2 className="text-2xl font-semibold text-[#621333] mb-4 text-center">
          ¿Qué deseas hacer?
        </h2>
        <div className="flex flex-col gap-4">
          <Link to="/register/evaluations">
            <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-3 rounded transition">
              Tests de Estilos de Aprendizaje
            </button>
          </Link>
          <Link to="/register/socioemotional">
            <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded transition">
              Test Socioemocionales
            </button>
          </Link>
          <Link to="/register/ofimatica">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded transition">
              Quiz de Ofimática
            </button>
          </Link>
          <Link to="/about">
            <button className="w-full bg-[#621333] hover:bg-[#4a0f27] text-white font-semibold py-3 rounded transition">
              Acerca de la Escuela
            </button>
          </Link>
        </div>
        </div>
      </section>
    </main>
  </div>
  
  );
}

export default Home;
