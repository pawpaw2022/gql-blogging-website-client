/** @format */
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  Stack,
  Box,
  FormLabel,
  Input,
  Textarea,
  Text,
  DrawerFooter,
  Button,
} from "@chakra-ui/react";
import React from "react";
import Categories from "./Categories";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  content: string;
  setContent: React.Dispatch<React.SetStateAction<string>>;
  tags: {
    id: string;
    name: string;
  }[];

  setTags: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        name: string;
      }[]
    >
  >;
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
  btnLoading: boolean;
  handleSubmit: (e: React.MouseEvent<HTMLElement>) => void;
};

export default function UpdatePost({
  isOpen,
  onClose,
  title,
  setTitle,
  content,
  setContent,
  tags,
  setTags,
  categoryData,
  btnLoading,
  handleSubmit,
}: Props) {
  return (
    <Drawer placement={"right"} onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">Create a new story</DrawerHeader>

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
                tags={tags}
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
  );
}
