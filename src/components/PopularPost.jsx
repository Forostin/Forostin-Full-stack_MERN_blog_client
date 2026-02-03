import React from "react";
import { AiFillEye, AiOutlineMessage } from 'react-icons/ai'
import { Link } from "react-router-dom";

import styles from '../styles/post.module.css';

export const PopularPost = ({popularPosts})=>{

//   // ✅ Форматирование даты 
  const date = new Date(popularPosts.createdAt);
  const formattedDate = date.toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    // hour: "2-digit",
    // minute: "2-digit",
  });

    if (!popularPosts){
        return (
                <div> 
                        Статті не знайдено.
                </div>
        )
    }
    return(
      <Link to={`/posts/${popularPosts._id}`}  className={styles.link}> 
        <div className={styles.post} > 
             <div className={styles.title}>заголовок статті : "{popularPosts.title}"</div>
            {/* <div>IMAGE</div> */}
            <div>
                <div className={styles.user}>автор :</div>    
                <div className={styles.data}>data :{formattedDate}</div>
            </div>         
           
            <div className={styles.user}><AiFillEye /> <span>{popularPosts.viewsCount}</span> </div>    
            <div className={styles.data}><AiOutlineMessage /> <span>0</span> </div>
            <p className={styles.text}>Post Text</p>
        </div>
     </Link>
    )       
}