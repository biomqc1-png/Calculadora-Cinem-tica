/**
 * Calculates average velocity.
 * V = D / T
 * @param distance - The distance traveled.
 * @param time - The time taken.
 * @returns The calculated velocity. Returns NaN if time is zero or inputs are invalid.
 */
export function calculateVelocity(distance: number, time: number): number {
  if (time === 0) {
    return NaN; // Avoid division by zero
  }
  return distance / time;
}

/**
 * Calculates distance.
 * D = V * T
 * @param velocity - The average velocity.
 * @param time - The time taken.
 * @returns The calculated distance.
 */
export function calculateDistance(velocity: number, time: number): number {
  return velocity * time;
}

/**
 * Calculates time.
 * T = D / V
 * @param distance - The distance traveled.
 * @param velocity - The average velocity.
 * @returns The calculated time. Returns NaN if velocity is zero or inputs are invalid.
 */
export function calculateTime(distance: number, velocity: number): number {
  if (velocity === 0) {
    return NaN; // Avoid division by zero
  }
  return distance / velocity;
}