// import useRequest from '../../hooks/use-request';
import Image from 'next/image';
import Link from 'next/link';

// import Router from 'next/router';

const MovieIndex = ({ movies }) => {
  //   const { doRequest, errors } = useRequest({
  //     url: `/api/movies`,
  //     method: 'get',
  //     onSuccess: (movie) =>
  //       Router.push('/movies/watch/[movieId]', `/movies/watch/${movie.id}`),
  //   });

  const handleRequest = (id) => {
    console.log(id);
  };

  const movieList = movies.map((movie) => {
    return (
      <div
        key={movie.id}
        className='card'
        style={{
          width: '545px',
          height: '320px',
          backgroundColor: 'black',
          marginRight: '5px',
          overflow: 'hidden',
          color: 'white',
        }}
      >
        <Image src='/t1.jpg' alt='image' width='900' height='450' />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            padding: '5px',
          }}
        >
          <div
            style={{
              display: 'flex',
              marginBottom: '10px',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                fontSize: '16px',
                marginBottom: '10px',
                color: 'lightgray',
                margin: '5px',
              }}
            >
              {movie.title}
            </div>
            {/* {errors} */}
            {/* <button
              onClick={() => handleRequest(movie.id)}
              className='btn btn-primary'
            >
              Play
            </button> */}
            <Link
              href='/movies/watch/[movieId]'
              as={`/movies/watch/${movie.id}`}
            >
              <a style={{ textDecoration: 'none'}}>
                <button className='btn btn-outline-primary'>PLAY</button>
              </a>
            </Link>
            <Link href='/movies/[movieId]' as={`/movies/${movie.id}`}>
              <a
                style={{
                  textDecoration: 'none',
                  margin: '5px',
                  
                }}
              >
                <button className='btn btn-outline-secondary'>DETAILS</button>
              </a>
            </Link>
          </div>
        </div>
        <div
          //   class='card-body'
          style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            fontSize: '14px',
            fontWeight: '600',
            color: 'gray',
          }}
        >
          <div>
            <div
              style={{
                fontSize: '13px',
                marginBottom: '10px',
                margin: '5px',
              }}
            >
              {movie.desc}
            </div>
          </div>
        </div>
      </div>
    );
  });

  return <div className='card-group mt-5 mx-5'>{movieList}</div>;
};

MovieIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/movies');

  return { movies: data };
};

export default MovieIndex;
