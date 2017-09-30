import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const SET_EXAMPLE = 'workshop/example/SET_EXAMPLE';

export const constants = {
  SET_EXAMPLE,
};

// ------------------------------------
// Actions
// ------------------------------------
export const setAwesomeCode = createAction(SET_EXAMPLE, message => ({ message }));

export const actions = {
  setAwesomeCode,
};

export const reducers = {
  [SET_EXAMPLE]: (state, { payload }) =>
    state.set('result', payload.message),
};

export const initialState = Map({
  result: '',
});

export default handleActions(reducers, initialState);
