import { combineReducers } from 'redux'

import { componentsSlice } from './components'
import { entityDefinitionsSlice } from './entityDefinitions'
import { mapDataSlice } from './mapData'

export const rootReducer = combineReducers({
  components: componentsSlice.reducer,
  entityDefinitions: entityDefinitionsSlice.reducer,
  mapData: mapDataSlice.reducer
})
