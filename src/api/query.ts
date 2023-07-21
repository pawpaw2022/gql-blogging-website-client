/** @format */

import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    posts {
      authorId
      content
      id
      likes {
        id
        postId
        userId
      }
      comments {
        content
        id
      }
      published
      tags {
        id
        name
      }
      title
      user {
        firstName
      }
    }
  }
`;
