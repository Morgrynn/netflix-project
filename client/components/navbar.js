import Link from 'next/link';

export default ({ currentUser }) => {
  return (
    <nav className='navbar navbar-light bg-light'>
      <Link href='/'>
        <a className='navbar-brand'>FitFlex</a>
      </Link>
      <div className='d-flex justify-content-end'>
        <ul className='nav d-flex align-items-center'>
          {currentUser ? 'Logout' : 'Login'}
        </ul>
      </div>
    </nav>
  );
};
