/** @format */

import { Heading, Container, Divider } from "@chakra-ui/react";
import Post from "./Post";
import { useQuery } from "@apollo/client";
import { PostsType } from "../../api/types";
import { GET_POSTS } from "../../api/query";
import CreatePost from "./CreatePost";
import { useEffect, useState } from "react";

const Posts = () => {
  const { loading, error, data: postsData } = useQuery<PostsType>(GET_POSTS);

  const [posts, setPosts] = useState<PostsType["posts"]>([]);

  useEffect(() => {
    if (postsData?.posts) {
      // Sort the posts by updatedAt date in descending order
      const sortedPosts = [...postsData.posts].sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
      setPosts(sortedPosts);
    }
  }, [postsData?.posts]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  return (
    <Container maxW={"6xl"} p={{ sm: 2, md: 4, lg: 7 }}>
      <Heading as="h1" marginBottom="2rem">
        Feeds and Stories
      </Heading>
      {localStorage.getItem("token") && <CreatePost setPosts={setPosts} />}
      <Divider my={8} />

      {posts.map((post) => (
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
