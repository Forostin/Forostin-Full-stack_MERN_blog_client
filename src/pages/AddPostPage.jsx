import React , {useState} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom' 

import styles from '../styles/addPostPage.module.css';
import { createPost } from '../redux/features/post/postSlice';

export const AddPostPage = ()=>{
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const clearFormHandler = ()=>{
               setTitle( '' )
               setText( '' )
               setImage( '' ) 
        }
    
    const submitHandler = ()=>{
          try{
               const data = new FormData()
               data.append('title', title)
               data.append('text', text)
               data.append('image', image)
               dispatch( createPost(data) )
               navigate('/')
             } catch (error){ 
                     console.log(error)
             }
        }
    
    return (
        <form 
               onSubmit={(e) => e.preventDefault() }
               className={styles.formPost}
        >
            
           <label className={styles.labelForm}>Прикрепить изображение:
               <input 
                     type='file' 
                     className={styles.inputText}
                     onChange={( e ) => setImage( e.target.files[0] )}
               />
           </label>  
           <div className={styles.imagePost}  >
                {/* Для отображения картинки при загрузке используем URL.createObjectURL(image) */}
                {image && (
                     <img src={URL.createObjectURL(image)} alt='' />
                )}
            </div>
           

           <label className={styles.labelForm}>
              Заголовок поста:
              <input 
                    type='text'
                    placeholder='Заголовок' 
                    className={styles.inputText}
                    value={title}
                    onChange = {(e) => setTitle( e.target.value )}      
              />
           </label>

           <label className={styles.labelForm}>
               Текст поста :
               
           </label>
           <textarea 
                   placeholder='Текст поста'
                   className={styles.inputText}
                   value={text}
                   onChange={(e) => setText( e.target.value )}
               />
           <div className={styles.wrapButton}>
              <button
                   className={styles.buttonAddPost} 
                   onClick={submitHandler} 
              >Добавить</button>
              <button 
                   className={styles.buttonCancel}
                   onClick={clearFormHandler}
                   >Отменить</button>
           </div>
          
        </form> 
    )
};