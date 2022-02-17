import buildClient from '../api/buildClient';

// Executed on the browser
const LandingPage = ({ currentUser }) => {
  console.log('Rendered from the browser', currentUser);
  return currentUser ? (
    <h1>You are signed in</h1>
  ) : (
    <h1>You are not signed in</h1>
  );
};

// Executed on the server
LandingPage.getInitialProps = async (context) => {
  console.log('LANDING PAGE');
  const { data } = await buildClient(context).get('/api/users/user');
  return data;
};

export default LandingPage;
