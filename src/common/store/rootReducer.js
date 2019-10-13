import { combineReducers } from 'redux'

import { componentSlice } from './components'

export const rootReducer = combineReducers({
  component: componentSlice.reducer
})
