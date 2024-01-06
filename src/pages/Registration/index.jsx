import React from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { useForm } from 'react-hook-form';
import GoogleIcon from '../../utils/google_icon-icons.com_62736.svg';


import styles from './Login.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAuth } from '../../redux/slices/userSlice';
import { Navigate } from 'react-router-dom';

export const Registration = () => {
  const dispatch = useDispatch()

  const {isAuth} = useSelector((state)=>state.user)
  
  const { register, handleSubmit, formState: { errors, isValid } } = useForm({
    defaultValues: {
      email: '',
      username: '',
      password: ''
    },
  })

  const onSubmit = (values) => {
    dispatch(fetchAuth(values))
  }
  if (isAuth) {
    return <Navigate to={'/'}/>
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={styles.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('username', {
            required: "Вкажіть ім'я",
            minLength: {
              value: 3,
              message: "Мін. к-сть символів - 3"
            }
          })}
          className={styles.field}
          label="Полное имя"
          helperText={errors.username?.message}
          fullWidth
          error={Boolean(errors.email?.message)}
        />

        <TextField
          {...register('email',
            {
              required: "Вкажіть eмейл",
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Неправильно введений емейл"
              }
            }
          )}
          error={Boolean(errors.email?.message)}
          className={styles.field}
          helperText={errors.email?.message}
          label="E-Mail"
          fullWidth />

        <TextField
          {...register('password', {
            required: "Вкажіть пароль",
            minLength: {
              value: 5,
              message: "Мін. к-сть символів - 5"
            }
          })}
          helperText={errors.password?.message}
          error={Boolean(errors.password?.message)}
          className={styles.field}
          label="Пароль"
          type="password"
          fullWidth
        />
        <Button type='submit' size="large" variant="contained" fullWidth>
          Зарегистрироваться
        </Button>
        <Button
          size="large"
          variant="contained"
          fullWidth
          style={{
            marginTop: '10px',
            color: '#fff', // Колір тексту
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          href='http://localhost:8000/auth/google'
        >
          <img
            src={GoogleIcon}
            alt="Google Icon"
            style={{ width: '20px', height: '20px', marginRight: '8px' }}
          />
          Увійти через Google
        </Button>

      </form>
    </Paper>
  );
};
