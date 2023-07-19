/** @format */

import { Heading, Container } from "@chakra-ui/react";
import Post from "./Post";

const Posts = () => {
  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1" marginBottom="2rem">
        Feeds and Stories
      </Heading>
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </Container>
  );
};

export default Posts;
