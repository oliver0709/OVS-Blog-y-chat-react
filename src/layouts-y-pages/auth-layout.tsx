import Login from "@/components/authentication/login";
import Register from "@/components/authentication/register";
import { Link } from "react-router-dom"; // Importar el Link para navegación

const AuthLayout = () => {
  return (
    <main className="bg-blue-200">
      <div className="min-h-screen grid md:grid-cols-2 md:place-content-center md:place-items-center container">
        {/* Sección de Login y Register */}
        <Login />
        <Register />
      </div>

      {/* Link al blog sin necesidad de autenticarse */}
      <div className="text-center mt-4">
        <Link to="/blog" className="text-blue-500 underline">
          Visit the Blog
        </Link>
      </div>
    </main>
  );
};

export default AuthLayout;
