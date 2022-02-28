import useRequest from '../../hooks/useRequest';
import { useState } from 'react';
import Router from 'next/router';

const MovieShow = ({ movie }) => {
  const { doRequest, errors } = useRequest({
    url: '/api/comments',
    method: 'post',
    body: {
      movieId: movie.id,
    },
    onSuccess: (comment) =>
      Router.push('/comments/[commentId]', `/comments/${comment.id}`),
  });


  // const onSubmit = (event) => {
  //   event.preventDefault();
  //   doRequest();
  // };

  return (
    <div>
      <h1>Title: {movie.title}</h1>
      <h4>Description: {movie.desc}</h4>
      
      {errors}
      <button onClick={() => doRequest()} className='btn btn-primary'>
        Comment
      </button>
    </div>
  );
};

MovieShow.getInitialProps = async (context, client) => {
  const { movieId } = context.query;
  const { data } = await client.get(`/api/movies/${movieId}`);

  return { movie: data };
};

export default MovieShow;
