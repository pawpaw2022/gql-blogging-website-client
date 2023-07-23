/** @format */

export type PostsType = {
  posts: Post[];
};

export type PostType = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  authorId: number;
  user: User;
  tags: Tag[];
  comments: Comment[];
  likes: Like[];
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
