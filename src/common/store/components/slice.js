import { createSlice } from 'redux-starter-kit'

import { hydrate } from 'common/store/actions'

export const componentsSlice = createSlice({
  slice: 'components',
  initialState: {
    components: []
  },
  reducers: {
    addComponent: (state, { payload }) => {
      state.components.push(payload)
    },
    updateComponent: (state, { payload }) => {
      state.components[payload.index] = payload.component
    }
  },
  extraReducers: {
    [hydrate]: (state, { payload }) => {
      return payload.components
    }
  }
})

const getComponents = state => state.components.components

componentsSlice.selectors = {
  getComponents
}
