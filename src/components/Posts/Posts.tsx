/** @format */

import {
  Heading,
  Container,
  Divider,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Post from "./Post";
import { useMutation, useQuery } from "@apollo/client";
import { CategoryType, PostsType, UpdatePostType } from "../../api/types";
import { GET_ALL_CATEGORY, GET_POSTS } from "../../api/query";
import CreatePost from "./Create/CreatePost";
import { useEffect, useState } from "react";
import { toastToast } from "./Hooks/useToast";
import { DELETEPOST, UPDATEPOST } from "../../api/mutation";
import UpdatePost from "./Create/UpdatePost";

const Posts = () => {
  const { loading, error, data: postsData } = useQuery<PostsType>(GET_POSTS);
  const { data: categoryData } = useQuery<CategoryType>(GET_ALL_CATEGORY);
  const [updatePost, { data: updateData }] =
    useMutation<UpdatePostType>(UPDATEPOST);
  const [deletePost, { data: deleteData }] = useMutation(DELETEPOST);

  const toast = useToast();

  const [posts, setPosts] = useState<PostsType["posts"]>([]);

  // Sort the posts by updatedAt date in descending order
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

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [editId, setEditId] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editTags, setEditTags] = useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [btnLoading, setBtnLoading] = useState(false);

  const handleEditPost = (id: string) => {
    const post = posts.find((post) => post.id === id);
    if (post) {
      setEditTitle(post.title);
      setEditContent(post.content);
      setEditTags(post.tags);
      setEditId(post.id);
    }
    onOpen();
  };

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // check if title and content are empty
    if (editTitle === "" || editContent === "") {
      toastToast({
        title: "Empty fields.",
        description: "Please fill in all the fields.",
        status: "error",
        toast,
      });
      return;
    }

    setBtnLoading(true);
    setTimeout(() => {
      // update in the database
      updatePost({
        variables: {
          postId: editId,
          title: editTitle,
          content: editContent,
          tagIds: editTags.map((tag) => tag.id),
        },
      });

      setEditTitle("");
      setEditContent("");
      setEditTags([]);
      setEditId("");
      setBtnLoading(false);
      onClose();
    }, 1500);
  };

  const handleDelete = (id: string) => {
    console.log("delete post, ", id);

    // delete from database
    deletePost({
      variables: {
        id,
      },
    });

    // delete from ui
    setPosts((prev) => prev.filter((post) => post.id !== id));
  };

  useEffect(() => {
    if (deleteData?.deletePost) {
      toastToast({
        title: "Post deleted.",
        description: "Your post has been deleted.",
        status: "success",
        toast,
      });
    }
  }, [deleteData?.deletePost]);

  useEffect(() => {
    if (updateData?.updatePostwTags) {
      toastToast({
        title: "Post updated.",
        description: "Your post has been updated.",
        status: "success",
        toast,
      });
    }
  }, [updateData?.updatePostwTags]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : Post {error.message}</p>;

  return (
    <>
      <Container maxW={"6xl"} p={{ sm: 2, md: 4, lg: 7 }}>
        <Heading as="h1" marginBottom="2rem">
          Feeds and Stories
        </Heading>
        {localStorage.getItem("token") && (
          <CreatePost
            setPosts={setPosts}
            categoryData={categoryData ? categoryData : { categories: [] }}
          />
        )}
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
            handleEditPost={handleEditPost}
            onOpen={onOpen}
            toast={toast}
            handleDelete={handleDelete}
          />
        ))}
      </Container>
      <UpdatePost
        isOpen={isOpen}
        onClose={onClose}
        title={editTitle}
        setTitle={setEditTitle}
        content={editContent}
        setContent={setEditContent}
        tags={editTags}
        setTags={setEditTags}
        categoryData={categoryData ? categoryData : { categories: [] }}
        btnLoading={btnLoading}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Posts;
