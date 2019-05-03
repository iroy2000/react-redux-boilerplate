import { put, fork, takeLatest } from 'redux-saga/effects'
import {
  constants as exampleConstants,
  actions as exampleActions,
} from '../modules/example'

import type { exampleType } from '../../common/types/example'

export function* fetchExampleData() {
  // pretend there is an api call
  const result: exampleType = {
    title: 'Everything is Awesome',
    description: __CONFIG__.description,
    source: 'This message is coming from Redux',
  }

  yield put(exampleActions.updateExample(result))
}

function* watchGetExample() {
  yield takeLatest(exampleConstants.GET_EXAMPLE, fetchExampleData)
}

export const exampleSaga = [fork(watchGetExample)]
