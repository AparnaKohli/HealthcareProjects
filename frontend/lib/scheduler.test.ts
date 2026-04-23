import { describe, it, expect } from 'vitest';
import { calculateSchedule } from './scheduler';

describe('calculateSchedule', () => {
  it('should handle once a day frequency', () => {
    const result = calculateSchedule('09:00', 'once');
    expect(result).toHaveLength(1);
    expect(result[0].time).toBe('09:00');
  });

  it('should handle twice a day with 10PM limit', () => {
    // 11 AM + 12 hours = 11 PM -> should be 10 PM
    const result = calculateSchedule('11:00', 'twice');
    expect(result).toHaveLength(2);
    expect(result[0].time).toBe('11:00');
    expect(result[1].time).toBe('22:00');
  });

  it('should handle twice a day within limits', () => {
    // 08 AM + 12 hours = 8 PM
    const result = calculateSchedule('08:00', 'twice');
    expect(result).toHaveLength(2);
    expect(result[1].time).toBe('20:00');
  });

  it('should handle thrice a day with 6 hour intervals', () => {
    const result = calculateSchedule('08:00', 'thrice');
    expect(result).toHaveLength(3);
    expect(result[1].time).toBe('14:00');
    expect(result[2].time).toBe('20:00');
  });

  it('should handle four times a day with 4 hour intervals', () => {
    const result = calculateSchedule('08:00', 'four');
    expect(result).toHaveLength(4);
    expect(result[1].time).toBe('12:00');
    expect(result[2].time).toBe('16:00');
    expect(result[3].time).toBe('20:00');
  });
});
