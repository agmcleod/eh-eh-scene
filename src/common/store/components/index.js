import produce from 'immer'
import { createSlice } from 'redux-starter-kit'

export const componentSlice = createSlice({
  slice: 'component',
  initialState: {},
  reducers: {
    setComponent: (state, { payload }) => {
      return produce(state, draftState => {
        const { name, ...data } = payload
        draftState[name] = data
      })
    }
  }
})
