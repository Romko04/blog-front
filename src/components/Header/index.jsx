import React, { useEffect } from 'react';
import Button from '@mui/material/Button';

import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Cookies from 'js-cookie';
import { fetchAuthMe, logoutUser } from '../../redux/slices/userSlice';

export const Header = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const cookie = Cookies.get('auth_token') // => 'value'
    if (cookie) {
      dispatch(fetchAuthMe(cookie))
    }
  }, [])
  const { isAuth } = useSelector((state) => state.user);

  const onClickLogout = () => { 
    dispatch(logoutUser())
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ARCHAKOV BLOG</div>
          </Link>
          <div className={styles.buttons}>
            {isAuth ? (
              <>
                <Link to="/posts/create">
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/auth/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
