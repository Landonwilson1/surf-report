import { getWindDirectionScore, getWaveSizeScore, getSwellPeriodScore } from './SurfReport.functions';

describe('Surf Report App', () => {
  describe('getWindDirectionScore', () => {
    it('Returns a wind score greater than 1 for E, NE, SE, or S wind direction arguments.', () => {
      expect(getWindDirectionScore('E')).toEqual(5)
    })
    it('Returns a default value of 1 for non-matched wind direction argument.', () => {
      expect(getWindDirectionScore('SSE')).toEqual(1)
    })
  })

  describe('getWaveSizeScore', () => {
    it('Returns a score of 1 when product of args is less than 10', () => {
      expect(getWaveSizeScore(4, 2)).toEqual(1)
    })
    it('Returns a score of 2 when product of args is between 10 and 19', () => {
      expect(getWaveSizeScore(9.5, 2)).toEqual(2)
    })
    it('Returns a score of 3 when product of args is between 19 and 24', () => {
      expect(getWaveSizeScore(10, 2.3)).toEqual(3)
    })
    it('Returns a score of 4 when product of args is between 24 and 30', () => {
      expect(getWaveSizeScore(14, 2)).toEqual(4)
    })
    it('Returns a score of 5 when product of args is greater than 30', () => {
      expect(getWaveSizeScore(300, 17)).toEqual(5)
    })
  })

  describe('getSwellPeriodScore', () => {
    it('Returns a score of 1 arg value is less than 10', () => {
      expect(getSwellPeriodScore(9.99)).toEqual(1)
    })
    it('Returns a score of 2 when arg value is between 10 and 12', () => {
      expect(getSwellPeriodScore(11)).toEqual(2)
    })
    it('Returns a score of 3 when arg value is between 12 and 16', () => {
      expect(getSwellPeriodScore(15)).toEqual(3)
    })
    it('Returns a score of 5 when arg value is greater than 16', () => {
      expect(getSwellPeriodScore(17)).toEqual(5)
    })
  })

})
