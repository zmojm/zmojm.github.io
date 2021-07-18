import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    articleList: [],
}

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        
    },
})

export const {  } = appSlice.actions

export default appSlice.reducer