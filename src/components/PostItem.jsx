import React from "react";
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'

import styles from '../styles/post.module.css';
import { Link } from "react-router-dom";

export const PostItem = ({post})=>{
      if (!post){
        return (
                <div> 
                        Статті не знайдено.
                </div>
        )
    }
  // ✅ Форматирование даты 
  const date = new Date(post.createdAt);
  const formattedDate = date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  });
    return(

      <Link to={`/${post._id}`}  className={styles.link}>  
        <div className={styles.post}> 
                         
            <div className={styles.imageWrap}>
                <h2 className={styles.title}>заголовок статті : "{post.title}"</h2>
                { post.imageUrl && 
                 ( 
                  <img
                     src={`http://localhost:3002${post.imageUrl}`}
                     alt='img' 
                     className={styles.image}     
                  />
                 ) 
                }      
            </div>
            <div>
                <div className={styles.user}>автор : {post.user}</div>    
                <div className={styles.data}>data : {formattedDate}</div>
            </div>         
            
            <p className={styles.text}>Post Text : " {post.text}"</p>
            <div className={styles.user}><AiFillEye /> <span>{post.viewsCount}</span> </div>    
            <div className={styles.data}><AiOutlineMessage /> <span>{post.comments?.length}</span> </div>
        </div>
     </Link>   
    )       
}