import { createSlice } from 'redux-starter-kit'

import { hydrate } from 'common/store/actions'

export const mapDataSlice = createSlice({
  slice: 'mapData',
  initialState: {
    tmxFilePath: ''
  },
  reducers: {
    setTmxFilePath: (state, { payload }) => {
      state.tmxFilePath = payload
    }
  },
  extraReducers: {
    [hydrate]: (state, { payload }) => {
      return payload.mapData
    }
  }
})

mapDataSlice.selectors = {
  getTmxFilePath: state => state.mapData.tmxFilePath
}
