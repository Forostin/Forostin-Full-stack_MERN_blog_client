import React from 'react';
import {Link, NavLink} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast} from "react-toastify"

import styles from '../styles/navbar.module.css';
import { checkIsAuth, logout } from '../redux/features/auth/authSlice.js';

export const Navbar = ()=>{
   let isAuth = useSelector(checkIsAuth);
  //  let isAuth = true;
   console.log(isAuth)
   const dispatch = useDispatch();

   const logoutHandler = ()=>{
         dispatch(logout())
         window.localStorage.removeItem('token')
         toast('Вы вышли из системы')
   }

   return ( 
   <div>
     <div className={styles.navbar}>
        <p className={styles.text_header}>ЕЕЕ</p>
            
             <ul className={styles.block_links}>
                <li>
                    <NavLink 
                       to = { '/' }
                       href='/' 
                       className={ ( {isActive} ) => isActive  ?  styles.link_active : styles.link_a }
                    > Главная
                    </NavLink>
                </li>

                {/* { isAuth &&  */}
                <li>
                    <NavLink
                       to = { '/posts' }
                       href='/posts' 
                       className={ ( {isActive} ) => isActive  ?  styles.link_active : styles.link_a }
                       > Посты
                    </NavLink>
                </li>
                {/* } */}

                { isAuth && 
                  <li>
                      <NavLink
                          to = { '/new' } 
                          href='/new' 
                          className={ ( {isActive} ) => isActive  ?  styles.link_active : styles.link_a }
                          > Добавить пост
                      </NavLink>
                 </li>
               }
                
             </ul>
             <div className={styles.block_button}>
               { isAuth ? (
                           <button onClick={logoutHandler}> Выйти </button>
                           ) : (
                           <Link to={'/login'}> <button>Авторизация</button> </Link> )
               }
             </div>
      </div>
   
     </div>
    )
};