import { combineReducers } from 'redux'

import { componentsSlice } from './components'
import { mapDataSlice } from './mapData'

export const rootReducer = combineReducers({
  components: componentsSlice.reducer,
  mapData: mapDataSlice.reducer
})
