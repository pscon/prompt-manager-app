/**
 * Normalizes a raw rating from the API to a 0-5 scale with 0.5 increments
 * @param rawRating - The raw rating from the API
 * @returns Normalized rating between 0 and 5 with 0.5 steps
 */
export function normalizeRating(rawRating: number): number {
  // Step 1: Clamp to [0, 100]
  const clamped = Math.min(100, Math.max(0, rawRating));
  
  // Step 2: Scale to [0, 5]
  const scaled = clamped / 20;
  
  // Step 3: Round to nearest 0.5
  const normalized = Math.round(scaled * 2) / 2;
  
  return normalized;
}

/**
 * Converts a normalized rating back to a raw rating for API updates
 * @param normalizedRating - The normalized rating (0-5 with 0.5 steps)
 * @returns Raw rating for API
 */
export function denormalizeRating(normalizedRating: number): number {
  return normalizedRating * 20;
}

/**
 * Generates rating options for UI (0, 0.5, 1, 1.5, ..., 5)
 */
export function getRatingOptions(): number[] {
  const options: number[] = [];
  for (let i = 0; i <= 10; i++) {
    options.push(i * 0.5);
  }
  return options;
}
