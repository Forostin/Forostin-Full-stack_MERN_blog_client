import React, {useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import facesImage from '../images/face.png'
import people from '../images/people.jpg'
import styles from '../styles/mainPage.module.css'
import {PostItem} from '../components/PostItem.jsx'

import { getMyPosts } from '../redux/features/post/postSlice.js';

export const MyPostsPage = ()=>{
    const dispatch = useDispatch();
    const { posts, loading } = useSelector((state) => state.post);

const { user } = useSelector(state => state.auth)

const myPosts = posts.allIds
  .map(id => posts.byId[id])
  .filter(post => post.user === user._id)
  console.log(myPosts)

    
    if (loading) return <div>Загрузка...</div>

    if (!posts){
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
                        //   posts?.map((post, index)=>(
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