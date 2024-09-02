import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id) {
      id
    }
  }
`;

const DeletePost: React.FC = () => {
  const [postId, setPostId] = useState('');
  const [deletePost, { data, loading, error }] = useMutation(DELETE_POST);

  const handleDelete = () => {
    deletePost({ variables: { id: postId } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <input
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        placeholder="Post ID"
      />
      <button onClick={handleDelete}>Delete Post</button>
      {data && <p>Post {data.deletePost.id} deleted successfully.</p>}
    </div>
  );
};

export default DeletePost;
