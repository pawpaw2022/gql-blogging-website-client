/** @format */

import { Heading, Container } from "@chakra-ui/react";
import Post from "./Post";
import { useQuery } from "@apollo/client";
import { PostsType } from "../../api/types";
import { GET_POSTS } from "../../api/query";

const Posts = () => {
  const { loading, error, data } = useQuery<PostsType>(GET_POSTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data);

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1" marginBottom="2rem">
        Feeds and Stories
      </Heading>

      {data?.posts.map((post) => (
        <Post key={post.id} title={post.title} content={post.content} />
      ))}
    </Container>
  );
};

export default Posts;
