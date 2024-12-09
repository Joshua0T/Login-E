"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Users() {
  const [users, setUsers] = useState([]); // Estado para almacenar los usuarios
  const [loading, setLoading] = useState(true); // Estado para manejar la carga
  const [error, setError] = useState(""); // Estado para manejar errores

  // Función para cargar los usuarios desde el backend
  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");  // Obtener el token del almacenamiento local
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,  // Enviar el token en los headers
        },
      });

      // Validación de la respuesta
      if (response.data && Array.isArray(response.data)) {
        setUsers(response.data); // Actualiza el estado con la lista de usuarios
      } else {
        setError("No se encontraron usuarios.");
      }
    } catch (error) {
      console.error("Error al cargar los usuarios:", error.message);
      // Mostrar error detallado si está disponible en la respuesta
      setError(`Hubo un error al cargar los usuarios: ${error.response ? error.response.data.error : error.message}`);
    } finally {
      setLoading(false); // Termina el estado de carga
    }
  };

  // Cargar usuarios cuando el componente se monta
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-xl">Cargando usuarios...</p>;
  }

  return (
    <div className="relative overflow-x-auto shadow-xl rounded-lg bg-white dark:bg-zinc-800">
      <div className="flex items-center justify-between flex-column flex-wrap md:flex-row space-y-4 md:space-y-0 pb-4 bg-gray-100 dark:bg-zinc-900 rounded-t-lg">
        <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white">
          Lista de Usuarios
        </h2>
      </div>

      {error && <p className="text-center text-red-500 font-semibold">{error}</p>} {/* Mostrar el error si ocurre */}
      
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-blue-500 dark:bg-zinc-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3 text-white">Nombre</th>
            <th scope="col" className="px-6 py-3 text-white">Correo</th>
            <th scope="col" className="px-6 py-3 text-white">Estado</th>
            <th scope="col" className="px-6 py-3 text-white">Acción</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr
                key={user._id}
                className="bg-white border-b dark:bg-zinc-900 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors duration-200"
              >
                <td className="px-6 py-4">{user.nombre}</td>
                <td className="px-6 py-4">{user.correo}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <div
                      className={`h-2.5 w-2.5 rounded-full mr-2 ${
                        user.activo ? "bg-green-500" : "bg-red-500"
                      }`}
                    ></div>{" "}
                    {user.activo ? "En Línea" : "Desconectado"}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Editar Usuario
                  </a>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-4 text-gray-500">
                No hay usuarios disponibles.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
