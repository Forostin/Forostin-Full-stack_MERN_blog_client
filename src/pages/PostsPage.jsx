import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import facesImage from '../images/face.png'
import people from '../images/people.jpg'
import styles from '../styles/mainPage.module.css'
import {PostItem} from '../components/PostItem.jsx'
import  {getAllPosts}  from '../redux/features/post/postSlice.js';


export const PostsPage = ()=>{
    const dispatch = useDispatch();
     const { posts, popularPosts } = useSelector((state) => state.post);
//========================================
// const { posts, popularPosts } = useSelector((state) => state.post)

const postsArray = posts.allIds.map(id => posts.byId[id])
//==========================================
    useEffect(()=>{
        dispatch(getAllPosts())  
     }, [dispatch]) 
    console.log(posts)
     console.log(popularPosts)
    if (!posts.allIds.length){
        return (
                <div> 
                        Постов не найдено.
                </div>
        )
    }
    return <div className={styles.wrapPosts} >
               <div className={styles.text}> 
                  <h3>Для возможности оставлять комментарии пройдите авторизацию.</h3>
                  {
                        // posts?.map((post, index)=>(
                        //   <PostItem key={index} post={post} />
                        // ))
                        postsArray.map((post) => (
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