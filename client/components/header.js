import Link from 'next/link';
import Image from 'next/image';

export default ({ currentUser }) => {
  const links = [
    !currentUser && { label: 'Register', href: '/auth/register' },
    !currentUser && { label: 'Login', href: '/auth/login' },
    currentUser && { label: 'Workouts', href: '/movies'},
    currentUser && { label: 'Upload Workout', href: '/movies/new'},
    currentUser && { label: 'Comments', href: '/comments'},
    currentUser && { label: 'Logout', href: '/auth/logout' }
  ]
    .filter(linkConfig => linkConfig)
    .map(({ label, href }) => {
      return (
        <li key={href} className="nav-item">
          <Link href={href}>
            <a className="nav-link link-light">{label}</a>
          </Link>
        </li>
      );
    });

  return (
    <nav className="navbar navbar-dark bg-dark">
      <Link href="/">
        <a className="navbar-brand">
          <Image src='/logo.png' alt='logo' width='200' height='50' />
        </a>
      </Link>

      <div className="d-flex justify-content-end">
        <ul className="nav d-flex align-items-center">{links}</ul>
      </div>
    </nav>
  );
};