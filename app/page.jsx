"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter(); // Inicializa el hook useRouter

  useEffect(() => {
    // Verifica si hay un token en el localStorage al cargar el componente
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginClick = () => {
    // Redirige al componente de inicio de sesión
    router.push("/inicio"); 
  };

  const handleUsersClick = () => {
    if (!isAuthenticated) {
      setShowModal(true);
    } else {
      router.push("/users"); // Redirige a la página de usuarios si está autenticado
    }
  };

  const handleLogout = () => {
    // Elimina el token del localStorage al cerrar sesión
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    router.push("/inicio"); // Redirige al inicio después de cerrar sesión
  };

  return (
    <>
    <nav className="bg-gray-100 border-b border-gray-300 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a
          href="#"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <img
            src="https://i.pinimg.com/736x/e5/39/88/e5398893f1c237503b832c447ed43f6d.jpg"
            className="h-20 rounded-full"
          />
          <span className="text-xl font-medium text-gray-800 dark:text-white">
            
          </span>
        </a>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          {isAuthenticated ? (
            <>
              <button
                onClick={handleLogout}
                className="px-4 py-2 font-medium text-white bg-red-500 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:bg-red-600 focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
              >
                Cerrar Sesión
              </button>
              <button
                onClick={handleUsersClick}
                className="px-4 py-2 font-medium text-white bg-green-500 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:bg-green-600 focus:ring-2 focus:ring-offset-2 focus:ring-green-400"
              >
                Ver Usuarios
              </button>
            </>
          ) : (
            <button
              onClick={handleLoginClick}
              className="px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            >
              Iniciar Sesión
            </button>
          )}
          <a
            href="/registro"
            className="px-4 py-2 font-medium text-white bg-indigo-500 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:bg-indigo-600 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-400"
          >
            Registrate
          </a>
        </div>
      </div>
    </nav>
    <nav className="bg-gray-50 dark:bg-gray-800">
      <div className="max-w-screen-xl px-4 py-3 mx-auto">
        <div className="flex items-center">
          <ul className="flex flex-row text-gray-700 dark:text-gray-200 space-x-6 rtl:space-x-reverse text-sm font-medium">
            <li>
              <a
                href="#"
                className="hover:text-blue-500 dark:hover:text-blue-400"
                onClick={handleUsersClick}
              >
                Usuarios
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30">
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 text-center">
          <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
            Atención
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Debes iniciar sesión para ver los usuarios.
          </p>
          <button
            className="mt-4 px-4 py-2 font-medium text-white bg-blue-500 rounded-md shadow-sm transition-all duration-300 ease-in-out hover:bg-blue-600 focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
            onClick={() => setShowModal(false)}
          >
            Cerrar
          </button>
        </div>
      </div>
    )}
    {isAuthenticated && (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
        <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
          Bienvenido, puedes ver los usuarios ahora.
        </h2>
        {/* Aquí puedes añadir la lista de usuarios */}
      </div>
    )}
  </>
  
  );
}
