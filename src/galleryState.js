import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const getPhotos = createAsyncThunk(
    '/photos',
async (page) => {
    const response = await  fetch(`https://api.unsplash.com/photos?page=${page}&client_id=rSWFSQr_GjKB77tZYlTRhRq7aKS8kLxV2LmSDip2aOk`)
    const formattedReponse =  await response.json()
    return formattedReponse
}
    )

export const getRandomPhotos = createAsyncThunk(
    '/photos/random',
async (page) => {
    const response = await  fetch(`https://api.unsplash.com/photos/random?client_id=rSWFSQr_GjKB77tZYlTRhRq7aKS8kLxV2LmSDip2aOk`)
    const formattedReponse =  await response.json()
    return formattedReponse
}
    )

    export const searchPhotos = createAsyncThunk(
        '/search/photos',
        async ({searchTerm, page}) => {
          const response = await fetch(`https://api.unsplash.com/search/photos?page=${page}&query=${searchTerm}&client_id=rSWFSQr_GjKB77tZYlTRhRq7aKS8kLxV2LmSDip2aOk`);
          const formattedResponse = await response.json();
          return formattedResponse.results;
        }
      );

export const gallerySlice =  createSlice({
    name:'gallery',
    initialState:{
        photos:[],
        randomPhoto:[],
        searchResults:[],
        isLoading: false,
        page:1
    },
    extraReducers:{
        [getPhotos.pending] :(state) => {
            state.isLoading = true
        },
        [getPhotos.fulfilled] : (state, action) =>{
            state.photos = [...state.photos, ...action.payload];
            state.isLoading= false
            state.page++
        },
        [getPhotos.rejected] : (state) => {
            state.isLoading  = false
        },
        [getRandomPhotos.pending] :(state) => {
            state.isLoading = true
        },
        [getRandomPhotos.fulfilled] : (state, action) =>{
            state.randomPhoto = action.payload;
            state.isLoading= false
        },
        [getRandomPhotos.rejected] : (state) => {
            state.isLoading  = false
        },
        [searchPhotos.pending]: (state) => {
            state.isLoading = true;
          },
          [searchPhotos.fulfilled]: (state, action) => {
            state.searchResults = [...state.searchResults, ...action.payload];
            state.isLoading = false;
            state.page++;
          },
          [searchPhotos.rejected]: (state) => {
            state.isLoading = false;
          },
    }
})

export default  gallerySlice.reducer