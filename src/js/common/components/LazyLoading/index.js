import Loadable from 'react-loadable'

import Loading from './Loading'

export const create = (loader) => Loadable({
  loader,
  loading: Loading,
})

export default create
