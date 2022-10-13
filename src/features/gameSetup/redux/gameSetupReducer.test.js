import {gameSetupReducer, getMaxOvers} from "./gameSetupReducer";

describe('GameSetup', () => {
  it('should set the max over number', () => {
    const state = gameSetupReducer(undefined);
    expect(state.maxOvers).toBe(2);
  });

  describe('getMaxOvers', () => {
    it('should return the max overs allowed in the innings', () => {
      const initialState = {
        maxOvers: 2,
      };
      expect(getMaxOvers(initialState)).toEqual(2);
    });
  });
});