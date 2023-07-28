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
    id: string;
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
    likes: {
      id: string;
      postId: string;
      userId: string;
    };
  };
};

export type CommentType = {
  createComment: {
    error: {
      message: string;
    };
    comment: {
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
    };
  };
  deleteComment: {
    error: {
      message: string;
    };
    comment: {
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
    };
  };
  updateComment: {
    error: {
      message: string;
    };
    comment: {
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
    };
  };
};

export type CategoryType = {
  categories: {
    id: string;
    name: string;
    tags: {
      id: string;
      name: string;
    }[];
  }[];
};

export type CreatePostType = {
  createPostwTags: {
    error: {
      message: string;
    };
    post: PostType;
  };
};

export type UpdatePostType = {
  updatePostwTags: {
    error: {
      message: string;
    };
    post: PostType;
  };
};
