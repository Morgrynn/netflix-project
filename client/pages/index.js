import Image from 'next/image';

const LandingPage = ({ currentUser }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <Image src='/insanity.png' alt='image' width='1500' height='900' />
      <div style={{ position: 'relative', left: '280px', bottom: '220px' }}>
        <span
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            padding: '4px',
            borderRadius: '2px',
          }}
        >
          GET IN THE BEST SHAPE OF YOUR LIFE
        </span>
      </div>
      <div style={{ position: 'relative', left: '340px', bottom: '220px' }}>
        <Image src='/logo.png' alt='image' width='300' height='150' />
      </div>
    </div>
  );

};

LandingPage.getInitialProps = async (context, client, currentUser) => {
  return {};
};

export default LandingPage;
