import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
import styles from '../../styles/Register.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/register',
    method: 'post',
    body: { email, password },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className={styles.login}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <Image src='/logo.png' alt='logo' width='200' height='50' />
        </div>
      </div>
      <div className={styles.container}>
        <form className={styles.form} onSubmit={onSubmit}>
          <h1>Register</h1>
          <input
            value={email}
            type='email'
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter Email'
            className={styles.input}
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            placeholder='Enter Password'
          />
          {errors}
          <button className={styles.loginBtn}>Register</button>
        </form>
      </div>
    </div>
  );
};
