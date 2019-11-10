import { createSlice } from 'redux-starter-kit'

export const mapDataSlice = createSlice({
  slice: 'mapData',
  initialState: {
    tmxFilePath: ''
  },
  reducers: {
    setTmxFilePath: (state, { payload }) => ({
      ...state,
      tmxFilePath: payload
    })
  }
})

mapDataSlice.selectors = {
  getTmxFilePath: state => state.mapData.tmxFilePath
}
