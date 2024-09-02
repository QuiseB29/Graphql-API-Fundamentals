import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";



const  GraphQLZeroAPI: string = 'https://graphqlzero.almansi.me/api';

const client = new ApolloClient({
  uri: GraphQLZeroAPI,
  cache: new InMemoryCache(),
});


const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
    
    </BrowserRouter>
  </React.StrictMode>
);

