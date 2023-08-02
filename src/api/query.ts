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
        id
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

export const GET_ME_AVATAR = gql`
  query {
    me {
      profile {
        avatar {
          url
        }
      }
      firstName
      lastName
    }
  }
`;

export const GET_ALL_CATEGORY = gql`
  query {
    categories {
      id
      name
      tags {
        id
        name
      }
    }
  }
`;

export const GET_ME_PROFILE = gql`
  query {
    me {
      profile {
        avatar {
          url
        }
        bio
      }
      firstName
      lastName
      id
      email
      createdAt
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
          id
          name
        }
        updatedAt
      }
      likes {
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
            id
            name
          }
          updatedAt
        }
      }
    }
  }
`;

export const GET_ME_SETTING = gql`
  query {
    me {
      profile {
        avatar {
          url
        }
        bio
      }
      firstName
      lastName
      id
      email
    }
  }
`;

export const GET_ALL_AVATARS = gql`
  query {
    avatars {
      url
      id
    }
  }
`;
