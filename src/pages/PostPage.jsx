import React, { useCallback, useEffect, useState } from 'react';
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai';
import { Link, useParams } from 'react-router-dom';

import axios from '../utils/axios';
import styles from '../styles/post.module.css';

export const PostPage = ()=>{
   const [post, setPost] = useState(null);
   const params = useParams();
  
   const fetchPost = useCallback(async()=>{
      const {data } = await axios.get(`/posts/${params.id}`) 
      setPost(data)
   },[params.id]);

     useEffect(()=>{
      fetchPost()   
   },[fetchPost]);

    if (!post){
        return (
                <div> 
                        Статті не знайдено.
                </div>
        )};

  

    console.log(post)

//  ✅ Форматирование даты 
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });  

    return ( 
      <div>
         <button><Link to={'/posts'}>Назад</Link></button> 

         <div>
             <div>
                 <div className={styles.imageWrap}>
                                <h2 className={styles.title}>заголовок статті : "{post.title}"</h2>
                                { post?.imageUrl && 
                                 ( 
                                  <img
                                     src={`http://localhost:3002${post.imageUrl}`}
                                     alt='img' 
                                     className={styles.imageBig}     
                                  />
                                 ) 
                                }      
                            </div>
                            <div>
                                <div className={styles.user}>автор : {post.user}</div>    
                                <div className={styles.data}>data : {formattedDate}</div>
                            </div>         
                            
                            <p className={styles.text}>Post Text{post.text}</p>
                            <div className={styles.user}><AiFillEye /> <span>{post.viewsCount}</span> </div>    
                            <div className={styles.data}><AiOutlineMessage /> <span>{post.comments?.length}</span> </div>
             </div>
             <div>Коментарі :</div>   
         </div>     
      
      </div>
)};