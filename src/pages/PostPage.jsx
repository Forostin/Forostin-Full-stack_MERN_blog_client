import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { AiFillEye, AiOutlineMessage, AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMemo } from 'react';

import axios from '../utils/axios';
import styles from '../styles/post.module.css';
import { removePost } from '../redux/features/post/postSlice';
import { createComment, getCommentsByPost, selectCommentsByPost,  makeSelectCommentsByPost  } from '../redux/features/comments/commentSlice';
import { Comment } from '../components/Comment.jsx'

export const PostPage = ()=>{
   const [post, setPost] = useState(null)
   const { id } = useParams()
   const { user } = useSelector((state) => state.auth)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [comment, setComment] = useState('')
  
   

   const selectComments = useMemo(
     () => makeSelectCommentsByPost(id),
     [id]
   );
   const comments = useSelector(selectComments);

// ===============

   const removePostHandler = () => {
       try {
          dispatch(removePost(id))
          toast('Стаття була видалена')
          navigate('/posts')
       } catch (error) {
          console.log(error)
       }
   }
   
   useEffect(() => {
      axios.get(`/posts/${id}`).then(({ data }) => {
         setPost(data)
      })

      dispatch(getCommentsByPost(id))

   }, [id, dispatch])  

   //   const handlerSubmit = () => {
   //         dispatch(createComment({ id, comment }))
   //         setComment('')
   //  };
     
   const handlerSubmit = async () => {
      if (!comment.trim()) return

      try {
        await dispatch(
         createComment({
               postId: id,
               text: comment
         })
      ).unwrap()

      setComment('')
     } catch (error) {
        console.error(error)
     };
   };
 
   const clearFormHandler = ()=>{
      setComment('');
   };


       if (!post){
          return (
                <div> 
                        Завантаження...
                </div>
        )};

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
         <button><Link to={`/posts`}>Всі статті</Link></button> 

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
                                <div className={styles.user}>автор : {post.user.fullName}</div>    
                                <div className={styles.data}>data : {formattedDate}</div>
                            </div>         
                            

                            <p className={styles.text}>Post Text : {post.text}</p>
                            <div className={styles.user}><AiFillEye /> <span>{post.viewsCount}</span> </div>    
                            <div className={styles.data}><AiOutlineMessage /> <span>{post.comments?.length}</span> </div>

                           
                            {post.user?._id === user?._id && (
                                <div className={styles.buttonWrap}>
                                   <button  
                                      onClick={removePostHandler} 
                                      className={styles.button}
                                      >видалити <AiTwotoneDelete />
                                   </button>
                                   <button className={styles.button}>
                                     <Link to={`/${id}/edit`}>
                                         редагувати <AiTwotoneEdit /> 
                                     </Link>
                                   </button> 
                                </div>
                               )
                            }
             </div>
             <div>Коментарі : 
                {
                  comments?.map((cmt) => (
                    <Comment key={cmt._id} cmt={cmt}/> 
                  ))
                }
                <form  className={styles.formComment} onSubmit={e=>e.preventDefault()}>
                    <label className={styles.labelForm}>
                        Коментар:
                         <input 
                                type='text'
                                placeholder='Коментар' 
                                className={styles.inputText}
                                value={comment}
                                onChange = {(e) => setComment( e.target.value )}      
                         />
                    </label>

                    <div className={styles.wrapButton}>
                       <button
                            className={styles.buttonAddComment} 
                            onClick={handlerSubmit} 
                       >Добавити</button>
                       <button 
                            className={styles.buttonCancel}
                            onClick={clearFormHandler}
                       >Скасувати</button>
                    </div>
          
                 </form>    
             </div>   
         </div>     
      
      </div>
)};