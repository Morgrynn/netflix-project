const CommentIndex = ({ comments }) => {
  return (
    <ul>
      {comments.map((comment) => {
        return (
          <li key={comment.id}>
            {comment.movie.title} - {comment.content}
          </li>
        );
      })}
    </ul>
  );
};

CommentIndex.getInitialProps = async (context, client) => {
  const { data } = await client.get('/api/comments');

  return { comments: data };
};

export default CommentIndex;
