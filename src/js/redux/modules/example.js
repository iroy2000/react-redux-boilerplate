import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

import { exampleType } from '../../common/types/example'

const GET_EXAMPLE = 'reto/example/GET_EXAMPLE';
const UPDATE_EXAMPLE = 'reto/example/UPDATE_EXAMPLE';

export const constants = {
  GET_EXAMPLE,
  UPDATE_EXAMPLE,
};

// ------------------------------------
// Actions
// ------------------------------------
export const getAwesomeCode = createAction(GET_EXAMPLE, () => ({}));
export const updateExample = createAction(UPDATE_EXAMPLE, (result : exampleType) => ({ result }));

export const actions = {
  getAwesomeCode,
  updateExample,
};

export default handleActions({
  [UPDATE_EXAMPLE]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
}, Map({
  result: '',
}));
