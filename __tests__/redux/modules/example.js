import { reducers, constants, actions, initialState } from  '../../../src/js/redux/modules/example'
import { getStore } from '../../../__fixtures__/store'

const fixture = {
  title: 'fake-title',
  description: 'fake-description',
  source: 'fake-source',
}

describe('redux.modules.example', () => {
  let store = null;

  beforeEach(() => {
    store = getStore({
      example: initialState()
    });
  });

  afterEach(() => {
    store = null;
  })

  it('should return correct state when running updateExample', () => {
    const type = constants.UPDATE_EXAMPLE
    const state = store.getState().example

    const result = reducers[type](state, { payload: fixture })

    expect(result.get('source')).toEqual(fixture.source)
    expect(result.get('title')).toEqual(fixture.title)
  })
})
