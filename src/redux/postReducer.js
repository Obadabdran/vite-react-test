import { createSlice } from '@reduxjs/toolkit';

const postSlice = createSlice({
  name: 'post',
  initialState: {
    postList: [],
  },
  reducers: {
    addPost: (state, action) => {
      state.postList.push(action.payload);
    },
    removePost: (state, action) => {
      state.postList = state.postList.filter(item => item.price !== action.payload);
    },
    removeall:(state)=>{
      state.postList=[]
    }
  },
});

export const { addPost, removePost,removeall } = postSlice.actions;


export default postSlice.reducer