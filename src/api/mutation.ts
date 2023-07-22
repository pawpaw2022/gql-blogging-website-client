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
