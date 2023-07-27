/** @format */

import { gql } from "@apollo/client";

export const SIGN_IN = gql`
  mutation SigninMutation($email: String!, $password: String!) {
    signin(credentials: { email: $email, password: $password }) {
      error {
        message
      }
      token
    }
  }
`;

export const SIGN_UP = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
  ) {
    signup(
      credentials: { email: $email, password: $password }
      firstName: $firstName
      lastName: $lastName
      bio: "Tell us about yourself!"
    ) {
      error {
        message
      }
      token
    }
  }
`;

export const LIKE = gql`
  mutation ($postId: ID!) {
    likePost(postId: $postId) {
      error {
        message
      }
      post {
        likes {
          id
          postId
          userId
        }
      }
    }
  }
`;

export const UNLIKE = gql`
  mutation ($postId: ID!) {
    unLikePost(postId: $postId) {
      error {
        message
      }
      post {
        likes {
          id
          postId
          userId
        }
      }
    }
  }
`;

export const ADDCOMMENT = gql`
  mutation ($postId: ID!, $content: String!) {
    createComment(postId: $postId, content: $content) {
      error {
        message
      }
      comment {
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
    }
  }
`;

export const DELETECOMMENT = gql`
  mutation ($commentId: ID!) {
    deleteComment(commentId: $commentId) {
      error {
        message
      }
      comment {
        id
      }
    }
  }
`;

export const UPDATECOMMENT = gql`
  mutation ($commentId: ID!, $content: String!) {
    updateComment(commentId: $commentId, content: $content) {
      error {
        message
      }
      comment {
        id
      }
    }
  }
`;

export const CREATEPOST = gql`
  mutation ($title: String!, $content: String!, $tagIds: [ID!]!) {
    createPostwTags(title: $title, content: $content, tagIds: $tagIds) {
      error {
        message
      }
      post {
        content
        title
        tags {
          name
        }
        likes {
          id
        }
        comments {
          content
        }
        updatedAt
      }
    }
  }
`;
