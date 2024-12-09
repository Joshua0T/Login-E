"use client"; // Asegura que el componente es del lado cliente
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Correcto para "App Router"

export default function RecuperarContraseña() {
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/forgot-password", { correo });
      setMensaje(response.data.message);
      // Opcional: redirigir tras el envío exitoso
      router.push("#");
    } catch (error) {
      setMensaje(error.response?.data?.error || "Error al enviar la solicitud");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-28 p-10 bg-gray-800 rounded-lg shadow-lg border-2 border-gray-700">
    <h1 className="text-center text-2xl font-bold text-white mb-8">Recuperar Contraseña</h1>
    
    <div className="mb-6">
      <label htmlFor="correo" className="block text-sm font-medium text-gray-300 mb-2">Correo:</label>
      <input
        type="email"
        id="correo"
        value={correo}
        onChange={(e) => setCorreo(e.target.value)}
        className="w-full p-4 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="example@gmail.com"
        required
      />
    </div>
  
    <button type="submit" className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-md transition-all duration-300 ease-in-out hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500">
      Enviar Enlace
    </button>
  
    {mensaje && <p className="mt-4 text-center text-sm text-red-500">{mensaje}</p>}
  </form>
  
  );
}
