import { describe, it, expect } from 'vitest';
import { normalizeRating, denormalizeRating, getRatingOptions } from '../rating';

describe('Rating Utilities', () => {
  describe('normalizeRating', () => {
    it('should normalize ratings correctly', () => {
      // Test cases from the requirements
      expect(normalizeRating(10)).toBe(0.5);
      expect(normalizeRating(50)).toBe(2.5);
      expect(normalizeRating(80)).toBe(4.0);
      expect(normalizeRating(5)).toBe(0.5); // 0.25 rounds to 0.5
      expect(normalizeRating(120)).toBe(5.0); // clamped to 100
    });

    it('should handle edge cases', () => {
      expect(normalizeRating(0)).toBe(0);
      expect(normalizeRating(100)).toBe(5.0);
      expect(normalizeRating(-10)).toBe(0); // clamped to 0
    });

    it('should round to nearest 0.5', () => {
      expect(normalizeRating(10)).toBe(0.5); // 0.5
      expect(normalizeRating(30)).toBe(1.5); // 1.5
      expect(normalizeRating(70)).toBe(3.5); // 3.5
    });
  });

  describe('denormalizeRating', () => {
    it('should convert normalized ratings back to raw ratings', () => {
      expect(denormalizeRating(0.5)).toBe(10);
      expect(denormalizeRating(2.5)).toBe(50);
      expect(denormalizeRating(4.0)).toBe(80);
      expect(denormalizeRating(5.0)).toBe(100);
    });
  });

  describe('getRatingOptions', () => {
    it('should return correct rating options', () => {
      const options = getRatingOptions();
      expect(options).toHaveLength(11); // 0, 0.5, 1, 1.5, ..., 5
      expect(options[0]).toBe(0);
      expect(options[1]).toBe(0.5);
      expect(options[10]).toBe(5.0);
    });
  });
});
