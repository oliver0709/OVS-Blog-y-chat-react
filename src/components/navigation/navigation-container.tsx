import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const NavigationComponent = ({ loggedInStatus, handleSuccessfulLogout }) => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem('token');
    
    // Actualizar el estado de loggedInStatus en App.tsx
    handleSuccessfulLogout();

    // Redirigir al usuario a la página de login o página principal
    navigate("/auth");
  };

  return (
    <nav className="bg-indigo-400 text-white px-6 py-3 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Links a la izquierda */}
        <div className="flex space-x-6">
          <NavLink
            to="/blog"
            className="hover:text-indigo-300 transition duration-300"
            activeclassname="underline"
          >
            Blog
          </NavLink>
          <NavLink
            to="/chat"
            className="hover:text-indigo-300 transition duration-300"
            activeclassname="underline"
          >
            Chat
          </NavLink>
          <NavLink
            to="/about-me"
            className="hover:text-indigo-300 transition duration-300"
            activeclassname="underline"
          >
            About
          </NavLink>
        </div>

        {/* Nombre del usuario y logout a la derecha si está logueado */}
        {loggedInStatus === "LOGGED_IN" && (
          <div className="flex items-center space-x-6">
            <span className="font-semibold">OLIVER VASQUEZ</span>
            <button
              onClick={handleSignOut}
              className="bg-red-400 hover:bg-red-500 text-white px-3 py-1 rounded-md transition duration-300"
            >
              <FontAwesomeIcon icon="sign-out-alt" />
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default NavigationComponent;
