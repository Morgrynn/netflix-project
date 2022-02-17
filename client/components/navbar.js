import Link from 'next/link';
import { useState, useEffect } from 'react';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import styles from '../styles/Navbar.module.scss';
import Image from 'next/image';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Register', href: '/auth/register' },
    !currentUser && { label: 'Login', href: '/auth/login' },
    currentUser && { label: 'Logout', href: '/auth/logout' },
  ]
    .filter((linkConfig) => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className={styles.item}>
          <Link href={href}>
            <a className={styles.link}>{label}</a>
          </Link>
        </li>
      );
    });

  const [isScrolled, setIsScrolled] = useState(false);

  // window.onscroll = () => {
  //   setIsScrolled(window.pageYOffset === 0 ? false : true);
  //   return () => (window.onscroll = null);
  // };

  useEffect(() => {
    window.onscroll = () => {
      setIsScrolled(window.pageYOffset === 0 ? false : true);
      return () => (window.onscroll = null);
    };
  }, []);

  return (
    <div className={isScrolled ? styles.navbar.scrolled : styles.navbar}>
      <div className={styles.container}>
        <div className={styles.left}>
          <Image src='/logo.png' alt='logo' width='200' height='50' />
          <span className={styles.title}>Homepage</span>
          <span className={styles.title}>Coming Soon</span>
        </div>
        <div className={styles.right}>
          <img
            src='https://ih1.redbubble.net/image.618427277.3222/flat,800x800,075,f.u2.jpg'
            alt=''
          />
          <div className={styles.profile}>
            <ArrowDropDownIcon className={styles.icon} />
            <div className={styles.options}>
              <span>{links}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <nav className='navbar navbar-light bg-light'>
    //   <Link href='/'>
    //     <a className='navbar-brand'>FitFlex</a>
    //   </Link>
    //   <div className='d-flex justify-content-end'>
    //     <ul className='nav d-flex align-items-center'>{links}</ul>
    //   </div>
    // </nav>
  );
};
