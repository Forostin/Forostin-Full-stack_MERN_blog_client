import React, { useState, useEffect} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { toast } from 'react-toastify';

import styles from '../styles/loginPage.module.css';
import { checkIsAuth, registerUser } from '../redux/features/auth/authSlice.js';

//  {/* Время просмотра 3ч 17min !!!!!!!!!!!!!!!!!!!!!!!! */}

export const RegisterPage = ()=>{
  const [fullName, setUsername] = useState('');
  const [passwordHash, setPasssword] = useState('');
  const {status} = useSelector((state)=> state.auth );
  const isAuth = useSelector(checkIsAuth);
  const navigate = useNavigate();

  useEffect(()=>{
    if(status){
      toast(status)
    }
    if(isAuth){
      navigate('/')
    }
  }, [status, isAuth, navigate])
  

  const dispatch = useDispatch();
  
  const handleSubmit = ()=>{
        try{ 
           dispatch(registerUser({ fullName, passwordHash }))
           setUsername('')
           setPasssword('')
        }
        catch(error){
           console.log(error)
        }
  };

  return <form onSubmit={ (e) => e.preventDefault()}
               className={styles.form}>
  <h1> Регистрация </h1>
  <Link to='/login' className='styles.link'>
         Ви вже зареєстровані ?
  </Link>

  <label className={styles.labelForm}>
    fullName : 
    <input
        type='text'
        value={ fullName }
        onChange={ (e)=> setUsername(e.target.value) }
        placeholder='fullName'
        className='styles.inputForm'></input>
  </label>

  
  <label className={styles.labelForm}>
    Password : 
    <input
        type='password'
        value={ passwordHash }
        onChange={(e) => setPasssword(e.target.value)}
        placeholder='Password'
        className='styles.inputForm'></input>
  </label>
  <div className={styles.wrapButton}>
     <button
        onClick={handleSubmit}
        type='submit'>
                   Реэстрація
     </button>
  
  </div>
 </form>
};