import React, { useState, useEffect } from 'react';
import {Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {toast} from 'react-toastify'

import styles from '../styles/loginPage.module.css'
import { checkIsAuth, loginUser } from '../redux/features/auth/authSlice';


export const LoginPage = ()=>{
    const [fullName, setUsername] = useState('');
    const [passwordHash, setPasssword] = useState('');
    const {status} = useSelector((state)=> state.auth);
    const isAuth = useSelector(checkIsAuth)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    useEffect(()=>{
        if(status){
            toast(status)
        }
        if( isAuth ){
          navigate('/')
        }
    }, [ status, isAuth, navigate ]);

    const handleSubmit = ()=>{
            try{ 
               dispatch(loginUser({ fullName, passwordHash }))
            }
            catch(error){
               console.log(error)
            }
    };


    return <form onSubmit={ e => e.preventDefault()}
                 className={styles.form}>
          <h1> Авторизація </h1>
          <Link to='/register'>
              Ще не зареєстровані ?
          </Link>

          <label className={styles.labelForm}>
            Username : 
             <input
                type='text'
                placeholder='Введіть ім`я'
                value={ fullName }
                onChange={ (e)=> setUsername(e.target.value) }
                className='styles.inputForm'>
             </input>
          </label>

                    
          <label className={styles.labelForm}>
            Password : 
            <input
                type='password'
                placeholder='Пароль'
                value={ passwordHash }
                onChange={(e) => setPasssword(e.target.value)}
                className='styles.inputForm'></input>
          </label>
          <div className={styles.wrapButton}>
             <button 
                type='submit'
                onClick = { handleSubmit } 
             >
                    Увійти
             </button>
            
          </div>
         </form>
};