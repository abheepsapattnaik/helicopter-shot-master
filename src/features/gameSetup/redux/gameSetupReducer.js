const initialState = {
  maxOvers: 2,
};

export const getMaxOvers = (gameSetup) => gameSetup.maxOvers;

export const gameSetupReducer = (state = initialState) => {
  return state;
};