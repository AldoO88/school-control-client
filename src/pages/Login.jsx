import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import authService from "../services/auth.service";

const initLoginForm = {
  email: '',
  password: '',
};

const Login = () => { 
  const [loginForm, setLoginForm] = useState(initLoginForm);
  const [errorMessage, setErrorMessage] = useState(undefined);

  const handleLoginForm = async (nameField, value) => {
    setLoginForm({
      ...loginForm,
      [nameField]: value,
    });
  }

  const navigate = useNavigate();
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.login(loginForm);
      storeToken(response.data.authToken);
      authenticateUser();
      navigate('/');
    } catch (error) {
      console.error('error', error);
      setErrorMessage(error.response.data.message)
    }
  }

  return (
    <>
      
      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://flynacademy.com/wp-content/uploads/2023/02/ofimatica.jpg)`,
          }}
        ></div>
        <form onSubmit={handleLogin} className="w-full p-8 lg:w-1/2" >
          <p className="text-xl text-gray-600 text-center">Bienvenido!</p>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="email"
              required
              name="email"
              id="email"
              value={loginForm.email}
              onChange={(event) => handleLoginForm(event.target.name, event.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <div className="flex justify-between">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Contraseña
              </label>
            </div>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              type="password"
              name="password"
              id="password"
              value={loginForm.password}
              onChange={(event) => handleLoginForm(event.target.name, event.target.value)}
              required
            />
            <a
              href="#"
              className="text-xs text-gray-500 hover:text-gray-900 text-end w-full mt-2"
            >
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          {errorMessage && <p className="text-red-800">{errorMessage}</p>}
          <div className="mt-8">
            <button 
              type="submit"
              className="bg-blue-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600">
              Iniciar Sesión
            </button>
          </div>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              No tengo cuenta.
              <Link to='/signup'>
                <span className="text-blue-700"> Registrate</span>
              </Link>
              
            </a>
          </div>
        </form>
      </div>
  
    </>
  )
}

export default Login;