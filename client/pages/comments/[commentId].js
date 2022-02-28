import useRequest from '../../hooks/useRequest';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Router } from 'next/router';

const CommentShow = ({ comment, currentUser }) => {
  const [input, setInput] = useState('');
  const [data, setData] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/comments',
    method: 'post',
    body: {
      movieId: comment.movie.id,
      content: input,
    },
    onSuccess: (comment) => console.log(comment),
  });

  const getComments = async () => {
    const resp = await axios.get('/api/comments');
    setData(resp.data);
  };

  useEffect(() => {
    getComments();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  const renderComments = data.map((c) => {
    let display;
    if (!c.content) {
      display = <div key={c.id}>Add a comment</div>;
      return display;
    } else {
      display = (
        <div key={c.id}>
          <li>
            <p>{currentUser.email}</p>
            {c.content}
          </li>
        </div>
      );
      return display;
    }
    // return (
    //   <div key={c.id}>
    //     <li>
    //       <p>{currentUser.email}</p>
    //       {c.content}
    //     </li>
    //   </div>
    // );
  });
  // const renderComments = comment.map((c) => {
  //   return <li key={c}>{c.content}</li>;
  // });

  return (
    <div>
      <h1>{comment.movie.title}</h1>
      <h4>{comment.movie.workout}</h4>
      <div>
        <form onSubmit={onSubmit}>
          <div className='form-group addProductItem'>
            <label>Comment</label>
            <input
              value={input}
              className='form-control'
              type='text'
              placeholder='comment'
              name='comment'
              onChange={(e) => setInput(e.target.value)}
            />
          </div>
          {errors}
          <button className='btn btn-primary addProductButton'>Upload</button>
        </form>
      </div>
      <div>
        <ul>{renderComments}</ul>
      </div>
    </div>
  );
};

CommentShow.getInitialProps = async (context, client, currentUser) => {
  const { commentId } = context.query;
  const { data } = await client.get(`/api/comments/${commentId}`);

  return { comment: data };
};

export default CommentShow;
