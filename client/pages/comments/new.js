const Comments = ({ comment }) => {
  return (
    <div>
      <h1>Comments</h1>
      <p>{comment}</p>
    </div>
  );
};

Comments.getInitialProps = async (context, client) => {
  const { data } = await client.get(`/api/comments`);

  return { comment: data };
};

export default Comments;
