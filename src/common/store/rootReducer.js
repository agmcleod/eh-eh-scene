import { combineReducers } from 'redux'

import { componentsSlice } from './components'

export const rootReducer = combineReducers({
  components: componentsSlice.reducer
})
