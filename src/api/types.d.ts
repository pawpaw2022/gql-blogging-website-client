/** @format */

export type PostsType = {
  posts: Post[];
};

export type PostType = {
  id: string;
  title: string;
  content: string;
  published: boolean;
  authorId: string;
  user: {
    firstName: string;
    lastName: string;
    profile: {
      avatar: {
        url: string;
      };
    };
  };
  tags: {
    name: string;
  }[];
  comments: {
    content: string;
    id: string;
    postId: string;
    userId: string;
    updatedAt: string;
    user: {
      firstName: string;
      lastName: string;
      profile: {
        avatar: {
          url: string;
        };
      };
    };
  }[];
  likes: {
    id: string;
    postId: string;
    userId: string;
  }[];

  updatedAt: string;
};

export type AuthType = {
  signin: {
    error: {
      message: string;
    };
    token: string;
  };

  signup: {
    error: {
      message: string;
    };
    token: string;
  };
};

export type MeType = {
  me: {
    id: string;
  };
};
