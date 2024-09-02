import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import PostList from './components/PostList';
import Form from './components/Form'
import DeletePost from './components/DeletePost';

// Create an Apollo Client instance
const client = new ApolloClient({
  uri: 'https://graphqlzero.almansi.me/api', // Replace with your GraphQL API URI
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <h1>GraphQL Posts</h1>
        <Form />
        <PostList />
        <DeletePost />
      </div>
    </ApolloProvider>
  );
};

export default App;
