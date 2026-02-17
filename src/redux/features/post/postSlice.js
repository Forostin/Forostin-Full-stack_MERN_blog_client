import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios.js';


const initialState = {
    posts: [],
    // posts: {
    //          byId: {},
    //          allIds: []
    //        },
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

export const getMyPosts = createAsyncThunk( 'post/getMyPosts',
   async () => {
      try {
         const { data } = await axios.get('/posts/me')
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
                    state.posts.push(action.payload);
                  })  

                // builder.addCase(createPost.fulfilled, (state, action) => {
                //     state.loading = false;

                //     const post = action.payload
                //     state.posts.byId[post._id] = post
                //     state.posts.allIds.unshift(post._id)
                //    })
                  
                builder.addCase(createPost.rejected, (state) => {
                    state.loading = false;
                  })
         // Get All Posts
                builder.addCase(getAllPosts.pending, (state) => {
                    state.loading = true;
                  })
        
                builder.addCase(getAllPosts.fulfilled, (state, action) => {
                    state.loading = false;
                    state.posts = action.payload.posts;
                    state.popularPosts = action.payload.popularPosts;
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
                    state.posts = state.posts.filter( 
                      (post) => post._id !== action.payload._id 
                    )
                  })

                // builder.addCase(removePost.fulfilled, (state, action) => {
                //     const id = action.payload._id

                //     delete state.posts.byId[id]
                //     state.posts.allIds = state.posts.allIds.filter(
                //     postId => postId !== id
                //     )
                //   })
                  
                builder.addCase(removePost.rejected, (state) => {
                    state.loading = false;
                  })

                         
          //  Редактирование поста       
                builder.addCase(updatePost.pending, (state) => {
                    state.loading = true;
                  })
                builder.addCase(updatePost.fulfilled, (state, action) => {
                    state.loading = false;
                    const index = state.posts.findIndex(
                            (post) => post._id === action.payload._id
                          );
                          if (index !== -1) {
                            state.posts[index] = action.payload;
                          }
                  })
               
                // builder.addCase(updatePost.fulfilled, (state, action) => {
                //     state.loading = false;
 
                //     state.posts = state.posts.map((post) =>
                //          post._id === action.payload._id
                //          ? action.payload
                //          : post
                //     )
                //   })
                // builder.addCase(updatePost.fulfilled, (state, action) => {
                //         const post = action.payload
                //         state.posts.byId[post._id] = post
                //   })

                builder.addCase(updatePost.rejected, (state) => {
                    state.loading = false;
                  })

          // My Posts
                builder.addCase(getMyPosts.pending, (state) => {
                  state.loading = true;
                })

                builder.addCase(getMyPosts.fulfilled, (state, action) => {
                  state.loading = false;
                  state.posts = action.payload; // сервер возвращает массив постов
                })

                builder.addCase(getMyPosts.rejected, (state) => {
                  state.loading = false;
                })
                
      } 
    }
);

export default postSlice.reducer