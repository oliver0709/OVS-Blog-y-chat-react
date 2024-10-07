import Login from "@/components/authentication/login";
import Register from "@/components/authentication/register";

const AuthLayout = () => {
  return (
    <main className="bg-blue-200">
      <div className="min-h-screen grid md:grid-cols-2 md:place-content-center md:place-items-center container">
        <Login />
        <Register />
      </div>
    </main>
  );
};
export default AuthLayout;