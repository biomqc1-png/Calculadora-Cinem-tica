import React from 'react';
import KinematicsCalculator from './components/KinematicsCalculator';
import UnitConverter from './components/UnitConverter';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col items-center py-8 px-4 sm:px-6 lg:px-8">
      <header className="w-full max-w-2xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4">
          Calculadora de Cinemática e Conversor de Unidades
        </h1>
        <p className="text-lg sm:text-xl text-gray-600">
          Uma ferramenta completa para cálculos de física e conversões de unidades.
        </p>
      </header>

      <main className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8">
        <KinematicsCalculator />
        <UnitConverter />
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} Programação Marcio Costa</p>
      </footer>
    </div>
  );
};

export default App;