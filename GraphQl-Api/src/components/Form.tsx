import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';

const CREATE_POST = gql`
  mutation CreatePost($title: String!, $body: String!) {
    createPost(input: { title: $title, body: $body }) {
      id
      title
      body
    }
  }
`;


const CreatePostForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const [createPost, { data, loading, error }] = useMutation(CREATE_POST);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createPost({ variables: { title, body } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Create Post</button>
      </form>
      {data && data.createPost && (
        <div>
          <h2>Newly created post:</h2>
          <p>ID: {data.createPost.id}</p>
          <p>Title: {data.createPost.title}</p>
          <p>Body: {data.createPost.body}</p>
        </div>
      )}
    </div>
  );
};

export default CreatePostForm;
