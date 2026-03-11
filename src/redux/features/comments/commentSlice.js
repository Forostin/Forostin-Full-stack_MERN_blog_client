import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';

// const initialState = {
//     comments: [],
//     loading: false
// };
const initialState = {
  byId: {},
  allIds: [],
  byPost: {},
  loading: false
}


export const createComment = createAsyncThunk(
  'comment/createComment',
  async ({ postId, text }) => {
    const { data } = await axios.post(
      `/comments/${postId}`,
      { text }
    )
    return data
  }
)


export const getCommentsByPost = createAsyncThunk(
  'comment/getCommentsByPost',
  async (postId) => {
    const { data } = await axios.get(`/comments/${postId}`)
    return { postId, comments: data }
  }
)

export const selectCommentsByPost = (postId) => (state) => {
  const ids = state.comment.byPost[postId] || []
  return ids.map(id => state.comment.byId[id])
}


const selectCommentState = (state) => state.comment;
export const makeSelectCommentsByPost = (postId) =>
  createSelector(
    [selectCommentState],
    (commentState) => {
      const ids = commentState.byPost[postId] || []
      return ids.map(id => commentState.byId[id])
    }
  )



export const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: ( builder ) => {
        // Create comment
                builder.addCase(createComment.pending, (state) => {
                    state.loading = true;
                  })
        
                // builder.addCase(createComment.fulfilled, (state, action) => {
                //      state.loading = false

                //      const comment = action.payload

                //      state.byId[comment._id] = comment
                //      state.allIds.push(comment._id)

                //      if (!state.byPost[comment.post]) {
                //        state.byPost[comment.post] = []
                //      }

                //      state.byPost[comment.post].push(comment._id)
                //    })

builder.addCase(createComment.fulfilled, (state, action) => {
  state.loading = false
                                 console.log(action.payload)
                                //  =====================
  const comment = action.payload
  const postId = comment.post

  state.byId[comment._id] = comment

  if (!state.byPost[postId]) {
    state.byPost[postId] = []
  }

  state.byPost[postId].push(comment._id)
})


               builder.addCase(getCommentsByPost.fulfilled, (state, action) => {
                     state.loading = false

                      // console.log(action.payload)
                     const { postId, comments } = action.payload

                     state.byPost[postId] = []

                     comments.forEach(comment => {
                           state.byId[comment._id] = comment
                           state.allIds.push(comment._id)
                           state.byPost[postId].push(comment._id)
                     })
                  })
                builder.addCase(createComment.rejected, (state) => {
                    state.loading = false;
                  })
        }
});

export default commentSlice.reducer;