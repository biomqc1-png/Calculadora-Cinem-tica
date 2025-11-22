import React, { useState, useCallback } from 'react';
import { UnitConversionMode } from '../types';
import Input from './Input';
import Button from './Button';
import { convertKmHToMs, convertMsToKmH } from '../utils/unitConversion';

const UnitConverter: React.FC = () => {
  const [mode, setMode] = useState<UnitConversionMode>(UnitConversionMode.KMH_TO_MS);
  const [inputValue, setInputValue] = useState<string>('');
  const [convertedValue, setConvertedValue] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearInputs = useCallback(() => {
    setInputValue('');
    setConvertedValue(null);
    setError(null);
  }, []);

  const handleConvert = useCallback(() => {
    setError(null);
    setConvertedValue(null);

    const numInputValue = parseFloat(inputValue);

    if (isNaN(numInputValue)) {
      setError('Por favor, insira um número válido para converter.');
      return;
    }

    let result: number;
    let fromUnit: string;
    let toUnit: string;

    switch (mode) {
      case UnitConversionMode.KMH_TO_MS:
        result = convertKmHToMs(numInputValue);
        fromUnit = 'km/h';
        toUnit = 'm/s';
        break;
      case UnitConversionMode.MS_TO_KMH:
        result = convertMsToKmH(numInputValue);
        fromUnit = 'm/s';
        toUnit = 'km/h';
        break;
      default:
        setError('Modo de conversão inválido.');
        return;
    }

    setConvertedValue(`${numInputValue.toFixed(2)} ${fromUnit} = ${result.toFixed(2)} ${toUnit}`);
  }, [mode, inputValue]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Conversor de Unidades</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          label="km/h para m/s"
          onClick={() => { setMode(UnitConversionMode.KMH_TO_MS); clearInputs(); }}
          className={mode === UnitConversionMode.KMH_TO_MS ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
        />
        <Button
          label="m/s para km/h"
          onClick={() => { setMode(UnitConversionMode.MS_TO_KMH); clearInputs(); }}
          className={mode === UnitConversionMode.MS_TO_KMH ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
        />
      </div>

      <Input
        label={`Valor em ${mode === UnitConversionMode.KMH_TO_MS ? 'km/h' : 'm/s'}`}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="ex: 50"
      />

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button label="Converter" onClick={handleConvert} className="flex-1 bg-green-500 hover:bg-green-700 text-white" />
        <Button label="Limpar" onClick={clearInputs} className="flex-1 bg-red-500 hover:bg-red-700 text-white" />
      </div>

      {convertedValue && (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-800 rounded">
          <p className="text-lg font-bold">Conversão: {convertedValue}</p>
        </div>
      )}
      {error && (
        <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-800 rounded">
          <p className="text-lg font-bold">Erro: {error}</p>
        </div>
      )}
    </div>
  );
};

export default UnitConverter;