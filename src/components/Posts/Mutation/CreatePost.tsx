/** @format */

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useMutation } from "@apollo/client";
import { CreatePostType, PostType } from "../../../api/types";
import { CREATEPOST } from "../../../api/mutation";
import { toastToast } from "../Hooks/useToast";
import DrawerForm from "./DrawerForm";

type Props = {
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
  categoryData: {
    categories: {
      id: string;
      name: string;
      tags: {
        id: string;
        name: string;
      }[];
    }[];
  };
};

export default function CreatePost({ setPosts, categoryData }: Props) {
  const [addPost, { data: addData }] = useMutation<CreatePostType>(CREATEPOST);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [tags, setTags] = React.useState<
    {
      id: string;
      name: string;
    }[]
  >([]);
  const [btnLoading, setBtnLoading] = React.useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // check if title and content are empty
    if (title === "" || content === "") {
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
      // create post in db
      addPost({
        variables: {
          title,
          content,
          tagIds: tags.map((tag) => tag.id),
        },
      });

      setTitle("");
      setContent("");
      setTags([]);
      setBtnLoading(false);
      onClose();
    }, 1500);
  };

  useEffect(() => {
    if (addData?.createPostwTags.post) {
      // update the ui
      setPosts((prev) => [addData.createPostwTags.post, ...prev]);

      toastToast({
        title: "Post created.",
        description: "Your post has been created.",
        status: "success",
        toast,
      });
    }
  }, [addData?.createPostwTags.post]);

  //   if (loading) return <p>Loading...</p>;
  //   if (error) return <p>Error :</p>;

  return (
    <>
      <Box mx="2">
        <Button
          leftIcon={<AiOutlinePlusCircle size={40} />}
          colorScheme="messenger"
          variant="outline"
          h="full"
          w="full"
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
          px={8}
          py={4}
          onClick={onOpen}
        >
          <VStack align={"start"} py={2} mx={2} overflowX={"auto"}>
            <Heading as="h2" fontSize={{ base: "lg", md: "xl", lg: "3xl" }}>
              Compose a story
            </Heading>
            <Text
              color={"gray.500"}
              fontSize={{ base: "xs", md: "md", lg: "xl" }}
              display={{ base: "none", md: "block" }}
            >
              Share a story, an idea, a thought, or a feeling.
            </Text>
          </VStack>
        </Button>
      </Box>
      <DrawerForm
        isOpen={isOpen}
        onClose={onClose}
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        tags={tags}
        setTags={setTags}
        categoryData={categoryData ? categoryData : { categories: [] }}
        setBtnLoading={setBtnLoading}
        btnLoading={btnLoading}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
