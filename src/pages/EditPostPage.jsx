import React , {useCallback, useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from '../utils/axios';
import styles from '../styles/addPostPage.module.css';
import { updatePost } from '../redux/features/post/postSlice';

export const EditPostPage = ()=>{
        const [title, setTitle] = useState('');
        const [text, setText] = useState('');
        const [oldImage, setOldImage] = useState('');
        const [newImage, setNewImage] = useState('');
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const params = useParams();

        // useEffect(() => {
        //     axios.get(`/posts/${params.id}`).then(({ data }) => {
        //                setPost(data);
        //     });
        // }, [params.id]);
        const fetchPost = useCallback(async ()=>{
            const { data } = await axios.get(`/posts/${params.id}`)
            setTitle(data.title);
            setText(data.text);
            setOldImage(data.imgeUrl);
        }, [params.id]);

        const submitHandler = ()=>{
            try {
                const updatedPost = new FormData();
                updatedPost.append('title', title);
                updatedPost.append('text', text);
                updatedPost.append('id', params.id);
                updatedPost.append('image', newImage);
                dispatch(updatePost(updatedPost));
                navigate('/posts/me');
            } catch (error) {
                console.log(error)
            }
        };

        const clearFormHandler = ()=>{
            setTitle('');
            setText('')
        }

        useEffect(() => {
            fetchPost()
        }, [fetchPost]);

        return (
        <form 
               onSubmit={(e) => e.preventDefault() }
               className={styles.formPost}
        >
            
           <label className={styles.labelForm}>Прикрепить изображение:
               <input 
                     type='file' 
                     className={styles.inputText}
                     onChange={( e ) => {
                        setNewImage( e.target.files[0] )
                        setOldImage( '' )
                    }}
               />
           </label>  
           <div className={styles.imagePost}  >
                {/* Для отображения картинки при загрузке используем URL.createObjectURL(image) */}
                {oldImage && (
                     <img src={`http://localhost:3002${oldImage}`} alt={oldImage.name} />
                )}
                {newImage && (
                     <img src={URL.createObjectURL(newImage)} alt={newImage.name} />
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
              >Оновити</button>
              <button 
                   className={styles.buttonCancel}
                   onClick={clearFormHandler}
                   >Відмінити</button>
           </div>
          
        </form> 
    )
};