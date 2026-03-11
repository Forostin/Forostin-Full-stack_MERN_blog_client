import React from "react";
import styles from '../styles/post.module.css';


export const Comment = ({cmt})=>{
   return  (
      <div> Comment 
         <div>
            AVATAR
         </div>
       
          <p className={styles.text}>{cmt.text}</p>
      </div>
   )  
   
}