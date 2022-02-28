import Link from 'next/link';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';

const WatchMovie = ({ movie }) => {
  return (
    <div
      style={{
        width: '90vw',
        height: '70vh',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          position: 'absolute',
          top: '90px',
          left: '10px',
          color: 'white',
          cursor: 'pointer',
          zIndex: 2,
        }}
      >
        <Link href='/movies'>
          <a>
            <ArrowBackIosOutlinedIcon />
            Back
          </a>
        </Link>
      </div>
      <video
        className='video'
        style={{
          width: '100%',
          height: '100%',
          objectfit: 'cover',
        }}
        autoPlay
        progress='true'
        controls
        src='https://media.w3.org/2010/05/sintel/trailer_hd.mp4'
      />
      <div
        style={{
          marginLight: '150px',
        }}
      >
        <p style={{ color: 'black' }}>{movie.title}</p>
      </div>
    </div>
  );
};

WatchMovie.getInitialProps = async (context, client) => {
  const { movieId } = context.query;
  const { data } = await client.get(`/api/movies/${movieId}`);

  return { movie: data };
};

export default WatchMovie;
