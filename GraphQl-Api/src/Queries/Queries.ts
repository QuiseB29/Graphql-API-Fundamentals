import { gql } from "urql";


export const GET_TITLE = gql`
query GetAllPosts {
    posts {
      data {
        title
        body
      }
    }
  }
`;

export const GETALLPOSTWITHIDANDUSER =  gql`
query GetAllPostsWithIdAndUser {
    posts {
      data {
        id
        title
        body
        user {
          id
          name
        }
      }
    }
  }
`;


