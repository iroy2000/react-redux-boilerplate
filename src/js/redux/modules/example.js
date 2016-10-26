import { handleActions } from 'redux-actions';
import { Map } from 'immutable';
import { resolve } from 'redux-promised';

const GET_EXAMPLE = 'reto/example/GET_EXAMPLE';

export const constants = {
  GET_EXAMPLE,
};

const getAwesomeCode = () => ({
  type: GET_EXAMPLE,
  payload: new Promise((resolved) => {
    const result = {
      title: 'Everything is Awesome',
      description: __CONFIG__.description,
      source: 'This message is coming from Redux',
    };

    resolved({
      result,
    });
  }),
});

export const actions = {
  getAwesomeCode,
};

export default handleActions({
  [resolve(GET_EXAMPLE)]: (state, { payload }) =>
    state.merge({
      ...payload,
    }),
}, Map({
  result: '',
}));
