import { createSlice, createSelector } from 'redux-starter-kit'

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
  }
})

const components = state => state.components

componentsSlice.selectors = {
  getComponents: createSelector(
    [components],
    components => Object.values(components)
  )
}
