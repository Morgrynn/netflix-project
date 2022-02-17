import { useState, useRef } from 'react';
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

  const emailRef = useRef();
  // const passwordRef = useRef();

  const handleStart = () => {
    setEmail(emailRef.current.value);
  };
  // const handleFinish = async () => {
  //   setPassword(passwordRef.current.value);
  //   await doRequest();
  // };

  const onSubmit = async (event) => {
    event.preventDefault();
    await doRequest();
  };

  return (
    <div className={styles.register}>
      <div className={styles.top}>
        <div className={styles.wrapper}>
          <Image src='/logo.png' alt='logo' width='200' height='50' />
          <Link href='/auth/login'>
            <a className={styles.link}>Sign In</a>
          </Link>
        </div>
      </div>
      <div className={styles.container}>
        <h1 className={styles.headerone}>Unlimited workout shows.</h1>
        <h2 className={styles.headertwo}>
          Get in the best shape of your life.
        </h2>
        <p className={styles.p}>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!email ? (
          <div className={styles.inputgroup}>
            <input
              className={styles.input}
              type='email'
              placeholder='email address'
              ref={emailRef}
            />
            <button className={styles.registerButton} onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className={styles.inputgroup} onSubmit={onSubmit}>
            <input
              className={styles.input}
              type='password'
              placeholder='password'
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className={styles.startButton}>
              Start
            </button>
            {errors}
          </form>
        )}
      </div>
      {/* <form onSubmit={onSubmit}>
        <h1>Register</h1>
        <div className='form-group'>
          <label>Email Address</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='form-control'
            ref={emailRef}
          />
        </div>
        <div className='form-group'>
          <label>Password</label>
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
            ref={passwordRef}
          />
        </div>
        {errors}
        <button className='btn btn-primary'>Register</button>
      </form> */}
    </div>
  );
};
