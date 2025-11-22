import { KMH_TO_MS_FACTOR, MS_TO_KMH_FACTOR, KM_TO_M_FACTOR, H_TO_S_FACTOR } from '../constants';

/**
 * Converts a speed from kilometers per hour (km/h) to meters per second (m/s).
 * @param kmh - The speed in km/h.
 * @returns The speed in m/s.
 */
export function convertKmHToMs(kmh: number): number {
  return kmh * KMH_TO_MS_FACTOR;
}

/**
 * Converts a speed from meters per second (m/s) to kilometers per hour (km/h).
 * @param ms - The speed in m/s.
 * @returns The speed in km/h.
 */
export function convertMsToKmH(ms: number): number {
  return ms * MS_TO_KMH_FACTOR;
}

/**
 * Converts a distance from kilometers (km) to meters (m).
 * @param km - The distance in km.
 * @returns The distance in m.
 */
export function convertKmToM(km: number): number {
  return km * KM_TO_M_FACTOR;
}

/**
 * Converts a distance from meters (m) to kilometers (km).
 * @param m - The distance in m.
 * @returns The distance in km.
 */
export function convertMToKm(m: number): number {
  return m / KM_TO_M_FACTOR;
}

/**
 * Converts a time from hours (h) to seconds (s).
 * @param h - The time in h.
 * @returns The time in s.
 */
export function convertHToS(h: number): number {
  return h * H_TO_S_FACTOR;
}

/**
 * Converts a time from seconds (s) to hours (h).
 * @param s - The time in s.
 * @returns The time in h.
 */
export function convertSToH(s: number): number {
  return s / H_TO_S_FACTOR;
}
