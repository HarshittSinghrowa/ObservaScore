// Unit tests for score calculation logic
describe('Score Calculation Logic', () => {

  const calculatePillarScore = (criteria) => {
    const total = criteria.reduce((s, c) => s + c.points, 0);
    const earned = criteria.filter(c => c.value).reduce((s, c) => s + c.points, 0);
    return total > 0 ? Math.round((earned / total) * 100) : 0;
  };

  const calculateOverallScore = (pillars) => {
    let totalWeight = 0, weightedSum = 0;
    pillars.forEach(p => {
      const score = calculatePillarScore(p.criteria);
      weightedSum += score * p.weight;
      totalWeight += p.weight;
    });
    return totalWeight > 0 ? Math.round(weightedSum / totalWeight) : 0;
  };

  const getGrade = (score) => {
    if (score >= 90) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 40) return 'D';
    return 'F';
  };

  const getMaturity = (score) => {
    if (score >= 90) return 'Platinum';
    if (score >= 75) return 'Gold';
    if (score >= 60) return 'Silver';
    return 'Bronze';
  };

  describe('Pillar score calculation', () => {
    it('should return 100 when all criteria pass', () => {
      const criteria = [
        { label: 'A', points: 20, value: true },
        { label: 'B', points: 30, value: true },
      ];
      expect(calculatePillarScore(criteria)).toBe(100);
    });

    it('should return 0 when no criteria pass', () => {
      const criteria = [
        { label: 'A', points: 20, value: false },
        { label: 'B', points: 30, value: false },
      ];
      expect(calculatePillarScore(criteria)).toBe(0);
    });

    it('should correctly calculate partial score', () => {
      const criteria = [
        { label: 'A', points: 50, value: true },
        { label: 'B', points: 50, value: false },
      ];
      expect(calculatePillarScore(criteria)).toBe(50);
    });
  });

  describe('Overall score calculation', () => {
    it('should correctly apply weights', () => {
      const pillars = [
        { name: 'Logging', weight: 50, criteria: [{ points: 100, value: true }] },
        { name: 'Metrics', weight: 50, criteria: [{ points: 100, value: false }] },
      ];
      expect(calculateOverallScore(pillars)).toBe(50);
    });
  });

  describe('Grade assignment', () => {
    it('assigns A for score >= 90', () => expect(getGrade(95)).toBe('A'));
    it('assigns B for score >= 75', () => expect(getGrade(80)).toBe('B'));
    it('assigns C for score >= 60', () => expect(getGrade(65)).toBe('C'));
    it('assigns D for score >= 40', () => expect(getGrade(50)).toBe('D'));
    it('assigns F for score < 40', () => expect(getGrade(30)).toBe('F'));
  });

  describe('Maturity level assignment', () => {
    it('assigns Platinum for score >= 90', () => expect(getMaturity(92)).toBe('Platinum'));
    it('assigns Gold for score >= 75', () => expect(getMaturity(77)).toBe('Gold'));
    it('assigns Silver for score >= 60', () => expect(getMaturity(62)).toBe('Silver'));
    it('assigns Bronze for score < 60', () => expect(getMaturity(45)).toBe('Bronze'));
  });
});
