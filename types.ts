import React from 'react';

export enum KinematicsMode {
  VELOCITY = 'VELOCITY',
  DISTANCE = 'DISTANCE',
  TIME = 'TIME',
}

export enum UnitConversionMode {
  KMH_TO_MS = 'KMH_TO_MS',
  MS_TO_KMH = 'MS_TO_KMH',
}

export enum DistanceUnit {
  METERS = 'METERS',
  KILOMETERS = 'KILOMETERS',
}

export enum TimeUnit {
  SECONDS = 'SECONDS',
  HOURS = 'HOURS',
}

export interface InputProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  step?: string;
}

export interface ButtonProps {
  onClick: () => void;
  label: string;
  className?: string;
  disabled?: boolean;
}