import Login from "@/components/authentication/login";
import Register from "@/components/authentication/register";


const RootLayout = () => {

    const user = false;

  return (
   <div className=""> {user ? (<h1>Welcome back</h1>) : (
   <div className="h-screen bg-blue-300 grid grid-cols-2 place-content-center">
   <Login/> 
   <Register/>
   </div>)
   }
   </div>
  )
}

export default RootLayout;