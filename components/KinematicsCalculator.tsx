import React, { useState, useCallback, useMemo } from 'react';
import { KinematicsMode, DistanceUnit, TimeUnit } from '../types';
import Input from './Input';
import Button from './Button';
import { calculateVelocity, calculateDistance, calculateTime } from '../services/calculationService';
import {
  convertKmToM,
  convertMToKm,
  convertHToS,
  convertSToH,
  convertKmHToMs,
  convertMsToKmH,
} from '../utils/unitConversion';

const KinematicsCalculator: React.FC = () => {
  const [mode, setMode] = useState<KinematicsMode>(KinematicsMode.VELOCITY);
  const [velocity, setVelocity] = useState<string>('');
  const [distance, setDistance] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [distanceUnit, setDistanceUnit] = useState<DistanceUnit>(DistanceUnit.METERS);
  const [timeUnit, setTimeUnit] = useState<TimeUnit>(TimeUnit.SECONDS);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const clearInputs = useCallback(() => {
    setVelocity('');
    setDistance('');
    setTime('');
    setResult(null);
    setError(null);
    setDistanceUnit(DistanceUnit.METERS); // Reset units on clear
    setTimeUnit(TimeUnit.SECONDS); // Reset units on clear
  }, []);

  const handleCalculate = useCallback(() => {
    setError(null);
    setResult(null);

    let numVelocity = parseFloat(velocity);
    let numDistance = parseFloat(distance);
    let numTime = parseFloat(time);

    // Validate inputs
    const isVelocityInvalid = isNaN(numVelocity) && mode !== KinematicsMode.VELOCITY;
    const isDistanceInvalid = isNaN(numDistance) && mode !== KinematicsMode.DISTANCE;
    const isTimeInvalid = isNaN(numTime) && mode !== KinematicsMode.TIME;

    if (isVelocityInvalid) {
      setError('Por favor, insira um número válido para a Velocidade.');
      return;
    }
    if (isDistanceInvalid) {
      setError('Por favor, insira um número válido para a Distância.');
      return;
    }
    if (isTimeInvalid) {
      setError('Por favor, insira um número válido para o Tempo.');
      return;
    }

    // Convert inputs to base units (meters and seconds) for calculation
    let baseDistance = numDistance;
    if (distanceUnit === DistanceUnit.KILOMETERS && mode !== KinematicsMode.DISTANCE && !isNaN(numDistance)) {
      baseDistance = convertKmToM(numDistance);
    }

    let baseTime = numTime;
    if (timeUnit === TimeUnit.HOURS && mode !== KinematicsMode.TIME && !isNaN(numTime)) {
      baseTime = convertHToS(numTime);
    }

    let baseVelocity = numVelocity;
    // If input velocity is given, convert it to m/s based on selected units
    if (mode !== KinematicsMode.VELOCITY && !isNaN(numVelocity)) {
      if (distanceUnit === DistanceUnit.KILOMETERS && timeUnit === TimeUnit.HOURS) {
        // If user provided velocity in km/h, convert to m/s
        baseVelocity = convertKmHToMs(numVelocity);
      }
      // If units are mixed or default m/s, assume input is already m/s
    }

    let calculatedValue: number | undefined;
    let unit: string = '';

    switch (mode) {
      case KinematicsMode.VELOCITY:
        if (isNaN(baseDistance) || isNaN(baseTime)) {
          setError('Por favor, insira números válidos para Distância e Tempo.');
          return;
        }
        calculatedValue = calculateVelocity(baseDistance, baseTime);
        // Convert back to desired display unit if applicable
        if (distanceUnit === DistanceUnit.KILOMETERS && timeUnit === TimeUnit.HOURS) {
          calculatedValue = convertMsToKmH(calculatedValue); // result is in km/h
          unit = 'km/h';
        } else {
          unit = 'm/s';
        }
        break;
      case KinematicsMode.DISTANCE:
        if (isNaN(baseVelocity) || isNaN(baseTime)) {
          setError('Por favor, insira números válidos para Velocidade e Tempo.');
          return;
        }
        calculatedValue = calculateDistance(baseVelocity, baseTime); // result is in meters
        // Convert back to desired display unit if applicable
        if (distanceUnit === DistanceUnit.KILOMETERS) {
          calculatedValue = convertMToKm(calculatedValue);
          unit = 'km';
        } else {
          unit = 'm';
        }
        break;
      case KinematicsMode.TIME:
        if (isNaN(baseDistance) || isNaN(baseVelocity)) {
          setError('Por favor, insira números válidos para Distância e Velocidade.');
          return;
        }
        calculatedValue = calculateTime(baseDistance, baseVelocity); // result is in seconds
        // Convert back to desired display unit if applicable
        if (timeUnit === TimeUnit.HOURS) {
          calculatedValue = convertSToH(calculatedValue);
          unit = 'h';
        } else {
          unit = 's';
        }
        break;
      default:
        setError('Modo de cálculo inválido.');
        return;
    }

    if (isNaN(calculatedValue as number)) {
      setError('Não foi possível calcular: Divisão por zero ou entradas inválidas.');
    } else {
      setResult(`${(calculatedValue as number).toFixed(2)} ${unit}`);
    }
  }, [mode, velocity, distance, time, distanceUnit, timeUnit]);

  const velocityLabel = useMemo(() => {
    if (distanceUnit === DistanceUnit.KILOMETERS && timeUnit === TimeUnit.HOURS) {
      return 'Velocidade (km/h)';
    }
    return 'Velocidade (m/s)';
  }, [distanceUnit, timeUnit]);

  const distanceLabel = useMemo(() => {
    return `Distância (${distanceUnit === DistanceUnit.METERS ? 'm' : 'km'})`;
  }, [distanceUnit]);

  const timeLabel = useMemo(() => {
    return `Tempo (${timeUnit === TimeUnit.SECONDS ? 's' : 'h'})`;
  }, [timeUnit]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-lg w-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Calculadora de Cinemática</h2>

      <div className="mb-4 flex flex-wrap gap-2">
        <Button
          label="Calcular Velocidade (V)"
          onClick={() => { setMode(KinematicsMode.VELOCITY); clearInputs(); }}
          className={mode === KinematicsMode.VELOCITY ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
        />
        <Button
          label="Calcular Distância (D)"
          onClick={() => { setMode(KinematicsMode.DISTANCE); clearInputs(); }}
          className={mode === KinematicsMode.DISTANCE ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
        />
        <Button
          label="Calcular Tempo (T)"
          onClick={() => { setMode(KinematicsMode.TIME); clearInputs(); }}
          className={mode === KinematicsMode.TIME ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-800'}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Unidade de Distância:</label>
        <div className="flex gap-4">
          <Button
            label="Metros (m)"
            onClick={() => setDistanceUnit(DistanceUnit.METERS)}
            className={distanceUnit === DistanceUnit.METERS ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
          />
          <Button
            label="Quilômetros (km)"
            onClick={() => setDistanceUnit(DistanceUnit.KILOMETERS)}
            className={distanceUnit === DistanceUnit.KILOMETERS ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Unidade de Tempo:</label>
        <div className="flex gap-4">
          <Button
            label="Segundos (s)"
            onClick={() => setTimeUnit(TimeUnit.SECONDS)}
            className={timeUnit === TimeUnit.SECONDS ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
          />
          <Button
            label="Horas (h)"
            onClick={() => setTimeUnit(TimeUnit.HOURS)}
            className={timeUnit === TimeUnit.HOURS ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}
          />
        </div>
      </div>

      <div className="inputs-section">
        {mode !== KinematicsMode.VELOCITY && (
          <Input label={velocityLabel} value={velocity} onChange={(e) => setVelocity(e.target.value)} placeholder="ex: 10" />
        )}
        {mode !== KinematicsMode.DISTANCE && (
          <Input label={distanceLabel} value={distance} onChange={(e) => setDistance(e.target.value)} placeholder="ex: 100" />
        )}
        {mode !== KinematicsMode.TIME && (
          <Input label={timeLabel} value={time} onChange={(e) => setTime(e.target.value)} placeholder="ex: 10" />
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mt-6">
        <Button label="Calcular" onClick={handleCalculate} className="flex-1 bg-green-500 hover:bg-green-700 text-white" />
        <Button label="Limpar" onClick={clearInputs} className="flex-1 bg-red-500 hover:bg-red-700 text-white" />
      </div>

      {result && (
        <div className="mt-4 p-4 bg-blue-100 border border-blue-400 text-blue-800 rounded">
          <p className="text-lg font-bold">Resultado: {result}</p>
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

export default KinematicsCalculator;