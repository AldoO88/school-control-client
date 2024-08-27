import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/auth.service";

const initSignupForm = {
  name: "",
  lastname: "",
  email: "",
  phone: "",
  profile: "",
  password: "",
  confPassword: "",
};


const Signup = () => {

  const [ signupForm, setSignupForm ] = useState(initSignupForm);
  const [ errorMessage, setErrorMessage ] = useState(undefined);

  const navigate = useNavigate();

  const handleSignupForm = async (nameField, value) => {
    setSignupForm({
      ...signupForm,
      [nameField]: value,
    });
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await authService.signup(signupForm);
      console.log(response.data);
      navigate('/login');
    } catch (error) {
      console.error('error', error);
      setErrorMessage(error.response.data.message);
    }
  }
  return (

      <div className="flex bg-white rounded-lg shadow-lg border overflow-hidden max-w-sm lg:max-w-4xl w-full">
        <div
          className="hidden md:block lg:w-1/2 bg-cover bg-blue-700"
          style={{
            backgroundImage: `url(https://static.vecteezy.com/system/resources/previews/004/815/686/original/cloud-storage-technology-data-backup-3d-isometric-computer-pc-with-mobile-phone-isolated-on-background-hosting-service-for-website-design-for-banner-vector.jpg)`,
          }}
        ></div>
        <form className="w-full p-8 lg:w-1/2" onSubmit={handleSubmit}>
          <p className="text-xl text-gray-600 text-center">Registro!</p>
          <div className="flex flex-row space-x-4 mt-4">
            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Nombre(s)
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                name="name"
                id="name"
                type="text"
                required
                value={signupForm.name}
                onChange={(e) => handleSignupForm('name', e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Apellido(s)
              </label>
              <input
                className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
                name="lastname"
                id="lastname"
                type="text"
                required
                value={signupForm.lastname}
                onChange={(e) => handleSignupForm('lastname', e.target.value)}
              />
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correo Electrónico
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              name="email"
              id="email"
              type="email"
              required
              value={signupForm.email}
              onChange={(e) => handleSignupForm('email', e.target.value)}
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Telefono
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              name="phone"
              id="phone"
              type="number"
              required
              value={signupForm.phone}
              onChange={(e) => handleSignupForm('phone', e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"         htmlFor="profile">Perfil</label>
            <select 
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700" 
              name="profile" 
              id="profile" 
              required
              value={signupForm.profile}
              onChange={(e) => handleSignupForm('profile', e.target.value)}
            >
              <option value="docente">Docente</option>
              <option value="alumno">Alumno</option>
            </select>
          </div>
          <div className="mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Contraseña
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              name="password"
              id="password"
              type="password"
              required
              value={signupForm.password}
              onChange={(e) => handleSignupForm('password', e.target.value)}
            />
          </div>
          <div className="mt-4 flex flex-col justify-between">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirmar Contraseña
            </label>
            <input
              className="text-gray-700 border border-gray-300 rounded py-2 px-4 block w-full focus:outline-2 focus:outline-blue-700"
              name="confPassword"
              id="confPassword"
              type="password"
              value={signupForm.confPassword}
              onChange={(e) => handleSignupForm('confPassword', e.target.value)}
            />
          </div>
          {errorMessage && <p className="text-red-800">{errorMessage}</p>}
          <div className="mt-8">
            <button className="bg-[#C7253E] text-white font-bold py-2 px-4 w-full rounded hover:bg-blue-600" type="submit">
              Registro
            </button>
          </div>
          <a
            href="#"
            className=" flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100"
          >
            
          </a>
          <div className="mt-4 flex items-center w-full text-center">
            <a
              href="#"
              className="text-xs text-gray-500 capitalize text-center w-full"
            >
              ¿Ya estas registrado?
              <Link to='/login'>
                <span className="text-blue-700"> Iniciar Sesión</span>
              </Link>
              
            </a>
          </div>
        </form>
      </div>
  );
};
export default Signup;
