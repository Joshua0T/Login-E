'use client';

import { useState } from 'react';

export default function RecoverPasswordPage() {
  const [correo, setCorreo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/recover-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Correo de recuperación enviado');
      } else {
        alert(data.error);
      }
    } catch (error) {
      console.error('Error al enviar correo de recuperación:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
    <form
      onSubmit={handleSubmit}
      className="max-w-md w-full bg-gray-800 p-8 rounded-xl shadow-lg border-2 border-gray-700"
    >
      <h2 className="text-center text-3xl font-bold text-white mb-8">
        Recuperar Contraseña
      </h2>
  
      <div className="mb-6">
        <label
          htmlFor="correo"
          className="block text-sm font-medium text-gray-300 mb-2"
        >
          Correo Electrónico:
        </label>
        <input
          type="email"
          id="correo"
          name="correo"
          value={correo}
          onChange={(e) => setCorreo(e.target.value)}
          placeholder="Ingresa tu correo"
          className="w-full p-4 border-2 border-gray-600 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
  
      <button
        type="submit"
        className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-lg transition-all duration-300 ease-in-out hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Recuperar Contraseña
      </button>
    </form>
  </div>
  
  );
}
