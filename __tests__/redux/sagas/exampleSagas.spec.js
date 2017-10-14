import { put } from 'redux-saga/effects'
import { fetchExampleData } from '../../../src/js/redux/sagas/exampleSaga'
import { actions as exampleActions } from '../../../src/js/redux/modules/example'

describe('redux.sagas.exampleSaga', () => {
  describe('fetchExampleData', () => {

    global.__CONFIG__ = {
      description: 'fake description'
    }

    const fixture = {
        title: 'Everything is Awesome',
        description: __CONFIG__.description,
        source: 'This message is coming from Redux',
      };

    it('should call exampleActions.updateExample with correct data', () => {
      const generator = fetchExampleData()

      let next = generator.next()

      expect(next.value).toEqual(put(exampleActions.updateExample(fixture)))
    })
  })
})
