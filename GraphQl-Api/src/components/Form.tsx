import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';


// GraphQL Mutations
const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

const UPDATE_POST = gql`
  mutation UpdatePost($id: ID!, $title: String!, $body: String!) {
    updatePost(id: $id, input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;

const DELETE_POST = gql`
  mutation DeletePost($id: ID!) {
    deletePost(id: $id)
  }
`;

const PostForm: React.FC = () => {
  const [postId, setPostId] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  const [createPost, { data: createData, loading: createLoading, error: createError }] = useMutation(CREATE_POST);
  const [updatePost, { data: updateData, loading: updateLoading, error: updateError }] = useMutation(UPDATE_POST);
  const [deletePost, { data: deleteData, loading: deleteLoading, error: deleteError }] = useMutation(DELETE_POST);

  // Handle form submit for Create/Update
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isUpdating && postId) {
      // Update an existing post
      updatePost({ variables: { id: postId, title, body } });
    } else {
      // Create a new post
      createPost({ variables: { title, body } });
    }
  };

  // Handle Delete
  const handleDelete = async () => {
    if (postId) {
      await deletePost({ variables: { id: postId } });
    }
  };

  if (createLoading || updateLoading || deleteLoading) return <p>Loading...</p>;
  if (createError) return <p>Error: {createError.message}</p>;
  if (updateError) return <p>Error: {updateError.message}</p>;
  if (deleteError) return <p>Error: {deleteError.message}</p>;

  return (
    <div>
      <h2>{isUpdating ? 'Update Post' : 'Create Post'}</h2>
      <form onSubmit={handleSubmit}>
        {isUpdating && (
          <input
            value={postId}
            onChange={(e) => setPostId(e.target.value)}
            placeholder="Post ID to Update/Delete"
          />
        )}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
        <input
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Body"
        />
        <button type="submit">{isUpdating ? 'Update Post' : 'Create Post'}</button>
      </form>

      <button onClick={() => setIsUpdating(!isUpdating)}>
        {isUpdating ? 'Switch to Create Mode' : 'Switch to Update Mode'}
      </button>

      {isUpdating && (
        <button onClick={handleDelete} style={{ marginLeft: '10px' }}>
          Delete Post
        </button>
      )}

      {createData && createData.createPost && (
        <div>
          <h3>Newly created post:</h3>
          <p>ID: {createData.createPost.id}</p>
          <p>Title: {createData.createPost.title}</p>
          <p>Body: {createData.createPost.body}</p>
        </div>
      )}

      {updateData && updateData.updatePost && (
        <div>
          <h3>Updated post:</h3>
          <p>ID: {updateData.updatePost.id}</p>
          <p>Title: {updateData.updatePost.title}</p>
          <p>Body: {updateData.updatePost.body}</p>
        </div>
      )}

      {deleteData && (
        <p>Post with ID {postId} has been deleted successfully.</p>
      )}
    </div>
  );
};

export default PostForm;



