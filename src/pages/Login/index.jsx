import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { fetchAuthLogin } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

export const Login = () => {
  const dispatch = useDispatch()
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: 'kurpe44lroma@gmail.com',
      password: '12345'
    },
  })
  const onSubmit = (values) => {
    dispatch(fetchAuthLogin(values))
  }
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('email', {
            required: "Вкажіть email",
            minLength: {
              value: 3,
              message: "Мін. к-сть символів - 3"
            }
          })}
          helperText={errors.email?.message}
          className={styles.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          fullWidth
        />
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
          fullWidth
        />
        <Button type="submit" size="large" variant="contained" fullWidth>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
