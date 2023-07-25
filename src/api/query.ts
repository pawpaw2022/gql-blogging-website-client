/** @format */

import { gql } from "@apollo/client";

export const GET_POSTS = gql`
  query {
    posts {
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
        postId
        userId
        updatedAt
        user {
          firstName
          lastName
          profile {
            avatar {
              url
            }
          }
        }
      }
      title
      user {
        firstName
        lastName
        profile {
          avatar {
            url
          }
        }
      }
      authorId
      published
      tags {
        name
      }
      updatedAt
    }
  }
`;

export const GET_ME_ID = gql`
  query {
    me {
      id
    }
  }
`;
