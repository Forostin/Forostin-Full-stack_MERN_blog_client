import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import facesImage from '../images/face.png'
import people from '../images/people.jpg'
import styles from '../styles/mainPage.module.css'
import {PostItem} from '../components/PostItem.jsx'
import  {getAllPosts}  from '../redux/features/post/postSlice.js';

export const MyPostsPage = ()=>{
    const dispatch = useDispatch();
// +++++++++++++++++++++++++++++++++
//     useEffect(()=>{
//         dispatch(getAllPosts())  
//     }, [dispatch]);

//  ++++++++++++++++++++++++++++   

 

    const { posts, loading } = useSelector((state) => state.post);
    const { user } = useSelector(state => state.auth);

   

// const myPosts = posts.allIds
//   .map(id => posts.byId[id])
//   .filter(post => post.user === user._id)

const myPosts = posts.allIds
  .map(id => posts.byId[id])
  .filter(post => post.user?._id === user?._id)  // user может быть null при первом рендере, добавляю защиту.
  console.log(myPosts)

    if (loading) return <div>Завантаження...</div>

    if (!posts){
        return (
                <div> 
                        Постів не знайдено.
                </div>
        )
    }
    return <div className={styles.wrapPosts} >
               <div className={styles.text}> 
                  <h3>Для можливості залишати коментарі пройдіть авторизацію.</h3>
                  {
                           myPosts?.map((post)=>(
                          <PostItem key={post._id} post={post} />
                        ))
                  }
               </div>
               <img src={facesImage} alt=''></img>
               <div className={styles.wrapImg}> 
                    <img src={people} alt=''></img>
               </div>          
        </div>
};