/** @format */

import React, { useEffect, useState } from "react";
import { CategoryType, PostType, UpdatePostType } from "../../api/types";
import { Box, useDisclosure, useToast } from "@chakra-ui/react";
import { toastToast } from "../Posts/Hooks/useToast";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ALL_CATEGORY } from "../../api/query";
import { DELETEPOST, UPDATEPOST } from "../../api/mutation";
import Post from "../Posts/Post";
import UpdatePost from "../Posts/Create/UpdatePost";

type Props = {
  posts: PostType[];
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

export default function Posts({ posts, setPosts }: Props) {
  const { data: categoryData } = useQuery<CategoryType>(GET_ALL_CATEGORY);
  const [updatePost, { data: updateData }] =
    useMutation<UpdatePostType>(UPDATEPOST);
  const [deletePost, { data: deleteData }] = useMutation(DELETEPOST);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

  return (
    <Box>
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
    </Box>
  );
}
