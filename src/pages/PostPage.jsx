import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector} from 'react-redux'
import { AiFillEye, AiOutlineMessage, AiTwotoneDelete, AiTwotoneEdit } from 'react-icons/ai';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify'

import axios from '../utils/axios';
import styles from '../styles/post.module.css';
import { removePost } from '../redux/features/post/postSlice';

export const PostPage = ()=>{
   const [post, setPost] = useState(null);
   const params = useParams();
   const {user} = useSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const removePostHandler = () => {
       try {
          dispatch(removePost(params.id))
          toast('Стаття була видалена')
          navigate('/posts')
       } catch (error) {
          console.log(error)
       }
   }
   
    useEffect(() => {
        axios.get(`/posts/${params.id}`).then(({ data }) => {
               setPost(data);
        });
    }, [params.id]);
  
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
                                <div className={styles.user}>автор : {post.user}</div>    
                                <div className={styles.data}>data : {formattedDate}</div>
                            </div>         
                            

                            <p className={styles.text}>Post Text : {post.text}</p>
                            <div className={styles.user}><AiFillEye /> <span>{post.viewsCount}</span> </div>    
                            <div className={styles.data}><AiOutlineMessage /> <span>{post.comments?.length}</span> </div>

                            { user?._id===post.user && (
                                <div className={styles.buttonWrap}>
                                   <button  
                                      onClick={removePostHandler} 
                                      className={styles.button}
                                      >видалити <AiTwotoneDelete />
                                   </button>
                                   <button className={styles.button}>
                                     <Link to={`/${params.id}/edit`}>
                                         редагувати <AiTwotoneEdit /> 
                                     </Link>
                                   </button> 
                                </div>
                               )
                            }
             </div>
             <div>Коментарі :</div>   
         </div>     
      
      </div>
)};