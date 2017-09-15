import { exampleSaga } from './exampleSaga';


export default function* sagas() {
  yield [
    ...exampleSaga,
  ];
}
