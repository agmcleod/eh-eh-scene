import { configureStore, getDefaultMiddleware } from 'redux-starter-kit'
import thunk from 'redux-thunk'

import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: [...getDefaultMiddleware(), thunk]
})
