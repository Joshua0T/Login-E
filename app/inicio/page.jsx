"use client";
import React, { useState } from "react";
import axios from "axios";

export default function Iniciar() {
  const [formData, setFormData] = useState({ correo: "", contraseña: "" });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/login", formData);
      setMensaje("Inicio de sesión exitoso");
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setMensaje(error.response?.data?.error || "Error al iniciar sesión");
    }
  };

  return (
    <>
     <form
  onSubmit={handleSubmit}
  className="max-w-lg mx-auto bg-red-900 p-8 mt-32 rounded-xl shadow-lg border-2 border-blue-400"
>
  <h1 className="text-center text-3xl font-bold text-white mb-8">Bienvenido, Inicia Sesión</h1>
  
  <div className="mb-6">
    <label htmlFor="correo" className="block mb-2 text-sm font-medium text-gray-300">Correo:</label>
    <input
      type="email"
      id="correo"
      name="correo"
      value={formData.correo}
      onChange={handleChange}
      className="w-full p-4 border-2 border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="example@gmail.com"
      required
    />
  </div>
  
  <div className="mb-6">
    <label htmlFor="contraseña" className="block mb-2 text-sm font-medium text-gray-300">Contraseña:</label>
    <input
      type="password"
      id="contraseña"
      name="contraseña"
      value={formData.contraseña}
      onChange={handleChange}
      className="w-full p-4 border-2 border-gray-600 rounded-lg bg-red-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    />
  </div>
  
  <button 
    type="submit" 
    className="w-full py-3 bg-green-600 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
  >
    Iniciar Sesión
  </button>
  
  <div className="mt-8 text-center">
    {mensaje && <p className="text-sm text-green-400 mt-4">{mensaje}</p>}
    <a href="/" className="text-sm text-blue-400 hover:underline mt-4 inline-block">Volver al Inicio</a>
    <a href="/recover-password" className="text-sm text-blue-400 hover:underline mt-2 inline-block">¿Olvidaste tu contraseña?</a>
  </div>
</form>

    </>
  );
}
