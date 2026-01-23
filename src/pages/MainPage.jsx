import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import facesImage from '../images/face.png'
import people from '../images/people.jpg'
import styles from '../styles/mainPage.module.css'
import {PostItem} from '../components/PostItem.jsx'
import {PopularPost} from '../components/PopularPost.jsx'
import  {getAllPosts}  from '../redux/features/post/postSlice.js';


export const MainPage = ()=>{
    const dispatch = useDispatch();

    const { posts, popularPosts } = useSelector((state) => state.post);
   

    useEffect(()=>{
        dispatch(getAllPosts())  
     }, [dispatch]) 
    console.log(posts)
       console.log(popularPosts)

       const postState = useSelector((state) => state.post);
console.log(postState);


    if (!popularPosts){
        return (
                <div> 
                        Постов не найдено.
                </div>
        )
    }
    return <div className={styles.facesWrap} >
               <div className={styles.text}> 
                  <h1>Добро пожаловать в наш блог!</h1>
                  <h3>Для возможности оставлять комментарии пройдите авторизацию.</h3>                 
               </div>
               <img src={facesImage} alt=''></img>
               <div>
                  <p className={styles.title}>Популярне :</p>
                  {
                     popularPosts?.map((popularPosts, index)=>(
                       <PopularPost key={index} popularPosts={popularPosts}/>
                     ))
                  }
                                   
               </div>
               <div className={styles.wrapImg}> 
                    <img src={people} alt=''></img>
               </div>
         </div>
};