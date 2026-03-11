import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';


const initialState = {
    // posts: [],
    // Храним посты в виде объекта, а не массива: 
    posts: {
             byId: {},
             allIds: []
           },
    popularPosts: [],
    loading: false 
};

export const createPost = createAsyncThunk('post/createPost',
    async ( params ) => { 
          try {
                const {data} = await axios.post('/posts',  params )
                return data
    }
          catch(error){
                console.log(error)
          } 
    }      
)


export const getAllPosts = createAsyncThunk( 'posts/getAllPosts',
   async () => {
       try {
               const {data} = await axios.get('/posts')
               return data  
       } catch (error) {
               console.log(error)
       }
   }
)



export const removePost = createAsyncThunk('post/removePost',
   async ( id ) => {
       try {
               const {data} = await axios.delete(`posts/${id}`, id)
               return  data  
       } catch (error) {
               console.log(error)
       }
   }
)


export const updatePost = createAsyncThunk('post/updatePost',
   async (updatedPost) => {
      const { data } = await axios.put(`posts/${updatedPost}`, updatedPost);
      return data;
  }
);


export const postSlice = createSlice(
    { name: 'post',
      initialState,
      reducers: {},
      extraReducers: ( builder ) => {
        // Create Post
                builder.addCase(createPost.pending, (state) => {
                    state.loading = true;
                  })
        
                builder.addCase(createPost.fulfilled, (state, action) => {
                    state.loading = false;

                    const post = action.payload
                    state.posts.byId[post._id] = post
                    state.posts.allIds.unshift(post._id)
                   })
                  
                builder.addCase(createPost.rejected, (state) => {
                    state.loading = false;
                  })
         // Get All Posts
                builder.addCase(getAllPosts.pending, (state) => {
                    state.loading = true;
                  })

                builder.addCase(getAllPosts.fulfilled, (state, action) => {
                       state.loading = false

                       const posts = action.payload.posts

                       state.posts.byId = {}
                       state.posts.allIds = []

                       posts.forEach(post => {
                           state.posts.byId[post._id] = post
                           state.posts.allIds.push(post._id)
                       })

                      state.popularPosts = action.payload.popularPosts
                  })

 
                builder.addCase(getAllPosts.rejected, (state) => {
                    state.loading = false;
                  })
                
          //  Удаление поста       
                builder.addCase(removePost.pending, (state) => {
                    state.loading = true;
                  })
             
                builder.addCase(removePost.fulfilled, (state, action) => {
                    state.loading = false;
                    const id = action.payload._id

                    delete state.posts.byId[id]
                    state.posts.allIds = state.posts.allIds.filter(
                    postId => postId !== id
                    )
                  })
                  
                builder.addCase(removePost.rejected, (state) => {
                    state.loading = false;
                  })

                         
          //  Редактирование поста       
                builder.addCase(updatePost.pending, (state) => {
                    state.loading = true;
                  })
             
                builder.addCase(updatePost.fulfilled, (state, action) => {
                        state.loading = false;

                        const post = action.payload
                        state.posts.byId[post._id] = post
                  })

                builder.addCase(updatePost.rejected, (state) => {
                    state.loading = false;
                  })
                
      } 
    }
);

export default postSlice.reducer