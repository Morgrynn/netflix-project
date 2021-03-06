import { useState } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';
import styles from '../../styles/Login.module.scss';
import Image from 'next/image';
import Link from 'next/link';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/login',
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
          <h1>Sign In</h1>
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
          <button className={styles.loginBtn}>Login</button>
          <span className={styles.text}>
            New to Fitflex?{' '}
            <b>
              <Link href='/auth/register'>
                <a className={styles.link}>Sign up now.</a>
              </Link>
            </b>
          </span>
        </form>
      </div>
    </div>
  );
};
