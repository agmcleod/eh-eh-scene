import { createSlice, createSelector } from 'redux-starter-kit'

import { hydrate } from 'common/store/actions'

export const componentsSlice = createSlice({
  slice: 'components',
  initialState: {},
  reducers: {
    setComponent: (state, { payload }) => {
      const { name, ...data } = payload
      state[name] = data
      state[name].name = name

      return state
    }
  },
  extraReducers: {
    [hydrate]: (state, { payload }) => {
      return payload.components
    }
  }
})

const components = state => state.components

componentsSlice.selectors = {
  getComponents: createSelector(
    [components],
    components => Object.values(components)
  )
}
