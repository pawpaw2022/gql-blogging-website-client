/** @format */

import React from "react";
import {
  Box,
  Heading,
  Link,
  Text,
  HStack,
  Tag,
  SpaceProps,
  useColorModeValue,
  Divider,
  useDisclosure,
  Collapse,
  useToast,
  IconButton,
  Flex,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComments, FaRegComments } from "react-icons/fa";
import { BlogAuthor } from "./BlogAuthor";
import { useLike } from "./Hooks/useLike";
import Comments from "./Comments/Comments";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { MeType } from "../../api/types";
import { useQuery } from "@apollo/client";
import { GET_ME_ID } from "../../api/query";

interface IBlogTags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

const BlogTags: React.FC<IBlogTags> = (props) => {
  return (
    <HStack spacing={2} marginTop={props.marginTop}>
      {props.tags.map((tag) => {
        return (
          <Tag size={"md"} variant="solid" colorScheme="orange" key={tag}>
            {tag}
          </Tag>
        );
      })}
    </HStack>
  );
};

const heartStyle = {
  color: "tomato",
  cursor: "pointer",
};

const commentStyle = {
  color: "dodgerblue",
  cursor: "pointer",
};

type Prop = {
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

  handleEditPost: (id: string) => void;
  onOpen: () => void;
  toast: any;
  handleDelete: (id: string) => void;
};

export default function Post({
  title,
  content,
  likes,
  comments,
  id,
  authorId,
  tags,
  user,
  updatedAt,
  handleEditPost,
  toast,
  handleDelete,
}: Prop) {
  const { data: meData } = useQuery<MeType>(GET_ME_ID);

  // like control
  const { handleLike, liked, numLikes } = useLike(likes, id, toast);

  // comment control
  const { isOpen, onToggle } = useDisclosure();
  const [numComments, setNumComments] = React.useState(comments.length);

  // tags control
  const tagNames = tags.map((tag) => tag.name);

  // delete control
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  // check if the user owns the post
  let owned = false;
  if (localStorage.getItem("token")) {
    if (meData?.me) {
      if (meData.me.id === authorId) {
        owned = true;
      }
    }
  }

  return (
    <>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
        <HStack justify={"space-between"} align={"start"}>
          <Box>
            <BlogTags tags={tagNames} />
            <Heading marginTop="1">
              <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
                {title}
              </Link>
            </Heading>
            <Text
              as="p"
              marginTop="2"
              color={useColorModeValue("gray.700", "gray.200")}
              fontSize="lg"
            >
              {content}
            </Text>
          </Box>
          {
            // if the user owns the post, show the edit and delete buttons
            owned && (
              <Flex direction={{ base: "column", md: "row" }}>
                <IconButton
                  colorScheme="teal"
                  variant="ghost"
                  aria-label="edit"
                  mr={{ base: "0", md: "2" }}
                  mb={{ base: "2", md: "0" }}
                  icon={<RiEditBoxLine size={25} />}
                  onClick={() => handleEditPost(id)}
                />
                <IconButton
                  colorScheme="pink"
                  variant="ghost"
                  aria-label="delete edit"
                  icon={<RiDeleteBin6Line size={25} />}
                  onClick={onDeleteOpen}
                />
              </Flex>
            )
          }
        </HStack>

        <HStack justify={"space-between"} mt="2">
          <HStack>
            <HStack mr="4">
              <Box onClick={handleLike}>
                {liked ? (
                  <AiFillHeart style={heartStyle} size={30} />
                ) : (
                  <AiOutlineHeart style={heartStyle} size={30} />
                )}
              </Box>
              <Text
                as="p"
                color={useColorModeValue("gray.500", "gray.300")}
                fontSize="md"
              >
                {numLikes}
              </Text>
            </HStack>
            <HStack>
              <Box onClick={onToggle}>
                {isOpen ? (
                  <FaComments size={30} style={commentStyle} />
                ) : (
                  <FaRegComments size={30} style={commentStyle} />
                )}
              </Box>
              <Text
                as="p"
                color={useColorModeValue("gray.500", "gray.300")}
                fontSize="md"
              >
                {numComments}
              </Text>
            </HStack>
          </HStack>
          <BlogAuthor
            name={user.firstName + " " + user.lastName}
            date={new Date(updatedAt)}
            avatarUrl={user.profile.avatar.url}
          />
        </HStack>
        <Collapse in={isOpen} animateOpacity>
          <Box w={{ base: "full", md: "auto" }}>
            <Comments
              comments={comments}
              toast={toast}
              id={id}
              setNumComments={setNumComments}
              meId={meData?.me?.id ? meData.me.id : ""}
            />
          </Box>
        </Collapse>
        <Divider my={8} />
        <Modal
          isCentered
          isOpen={isDeleteOpen}
          onClose={onDeleteClose}
          motionPreset="slideInBottom"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Are you sure?</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              Once deleted, you will not be able to recover this story! <br />
              <Text color={"gray.500"} mb={2}>
                You will lose all the comments and likes
              </Text>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onDeleteClose}>
                Close
              </Button>
              <Button
                colorScheme="red"
                onClick={() => {
                  handleDelete(id);
                  onDeleteClose();
                }}
              >
                Delete
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </>
  );
}
