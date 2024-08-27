import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

const Home = () => {

  const { isLoggedIn, logout } = useContext(AuthContext)

  return (
    <div>
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
  );
}

export default Home;