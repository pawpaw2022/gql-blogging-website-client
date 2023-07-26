/** @format */

import { Heading, Container } from "@chakra-ui/react";
import Post from "./Post";
import { useQuery } from "@apollo/client";
import { PostsType } from "../../api/types";
import { GET_POSTS } from "../../api/query";

const Posts = () => {
  const { loading, error, data: postsData } = useQuery<PostsType>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <Container maxW={"6xl"} p={{ sm: 2, md: 4, lg: 7 }}>
      <Heading as="h1" marginBottom="2rem">
        Feeds and Stories
      </Heading>

      {postsData?.posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          authorId={post.authorId}
          title={post.title}
          content={post.content}
          published={post.published}
          updatedAt={post.updatedAt}
          comments={post.comments}
          likes={post.likes}
          user={post.user}
          tags={post.tags}
        />
      ))}
    </Container>
  );
};

export default Posts;
