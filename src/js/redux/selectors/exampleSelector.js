import { createSelector } from 'reselect'

const exampleDataSelector = (state) => state.example

const resultSelector = createSelector(
  exampleDataSelector,
  (payload) => payload.get('result')
)

export const exampleSelector = (state) => ({
  result: resultSelector(state),
})
