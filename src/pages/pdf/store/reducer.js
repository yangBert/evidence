import * as types from './actionTypes';

const defaultState = {
  sigSaveLoading: false,
  results: []
};

export default (state = defaultState, action) => {
  let newState = JSON.parse(JSON.stringify(state))
  switch (action.type) {
    case types.SIG_SAVE_LOADING:
      newState.sigSaveLoading = action.sigSaveLoading
      break;
    case types.SET_RESULTS:
      newState.results = action.results
      break;
    default:
      break;
  }
  return newState
}