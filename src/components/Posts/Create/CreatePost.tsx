/** @format */

import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { GET_ALL_CATEGORY } from "../../../api/query";
import { useMutation, useQuery } from "@apollo/client";
import { CategoryType, CreatePostType, PostType } from "../../../api/types";
import Categories from "./Categories";
import { CREATEPOST } from "../../../api/mutation";
import { toastToast } from "../Hooks/useToast";

type Props = {
  setPosts: React.Dispatch<React.SetStateAction<PostType[]>>;
};

export default function CreatePost({ setPosts }: Props) {
  const { data: categoryData } = useQuery<CategoryType>(GET_ALL_CATEGORY);
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
      <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">
            Create a new story
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <Box>
                <FormLabel htmlFor="title" fontSize="lg" fontWeight="bold">
                  Title
                </FormLabel>
                <Input
                  id="title"
                  placeholder="Title of your story"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Box>

              <Box>
                <FormLabel htmlFor="content" fontSize="lg" fontWeight="bold">
                  Content
                </FormLabel>
                <Textarea
                  id="content"
                  placeholder="Content of your story"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </Box>

              <Text fontSize="lg" fontWeight="bold">
                Tags
              </Text>

              {categoryData?.categories.map((category) => (
                <Categories
                  key={category.id}
                  categoryData={category}
                  setTags={setTags}
                />
              ))}
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="blue"
              onClick={handleSubmit}
              isLoading={btnLoading}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
