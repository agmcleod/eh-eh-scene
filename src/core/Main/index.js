import { connect } from 'react-redux'

import { Main as MainComp } from './Main'
import { mapDataSlice } from 'common/store/mapData'

export const Main = connect(
  null,
  { setTmxFilePath: mapDataSlice.actions.setTmxFilePath }
)(MainComp)
