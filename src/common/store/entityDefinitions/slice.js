import { createSlice } from 'redux-starter-kit'

import { hydrate } from 'common/store/actions'

export const entityDefinitionsSlice = createSlice({
  slice: 'entityDefinitions',
  initialState: {
    entityDefinitions: []
  },
  reducers: {
    addEntityDefinition: (state, { payload }) => {
      state.entityDefinitions.push(payload)
    },
    updateEntityDefinition: (state, { payload }) => {
      state.components[payload.index] = payload.entityDefinition
    }
  },
  extraReducers: {
    [hydrate]: (state, { payload }) => {
      return {
        ...state,
        ...payload.entityDefinitions
      }
    }
  }
})
