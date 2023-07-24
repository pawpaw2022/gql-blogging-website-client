/** @format */

import React, { useEffect } from "react";
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
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComments, FaRegComments } from "react-icons/fa";
import { BlogAuthor } from "./BlogAuthor";
import { PostType } from "../../api/types";
import { useMutation } from "@apollo/client";
import { LIKE, UNLIKE } from "../../api/mutation";

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

export default function Post({
  title,
  content,
  likes,
  comments,
  authorId,
  id,
  tags,
  user,
  updatedAt,
}: PostType) {
  const [liked, setLiked] = React.useState(false);
  const [numLikes, setNumLikes] = React.useState(likes.length);
  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);

  // comment control
  const { isOpen, onToggle } = useDisclosure();

  // tags control
  const tagNames = tags.map((tag) => tag.name);

  const toast = useToast();

  const handleLike = () => {
    // check if the user is logged in
    if (!localStorage.getItem("token")) {
      toast({
        position: "top",
        title: "Invalid action",
        description: "You must be logged in to like a post.",
        status: "error",
        duration: 9000, // 9 seconds
        isClosable: true,
      });
      return;
    }

    setLiked((prev) => !prev);

    if (liked) {
      setNumLikes((prev) => prev - 1);

      unlike({
        variables: {
          postId: id,
        },
      });
    } else {
      setNumLikes((prev) => prev + 1);

      like({
        variables: {
          postId: id,
        },
      });
    }
  };

  return (
    <Box marginTop={{ base: "2", sm: "6" }}>
      <Box
        display="flex"
        flex="1"
        flexDirection="column"
        justifyContent="center"
        marginTop={{ base: "3", sm: "0" }}
      >
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
                {comments.length}
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
          <Divider marginTop="21px" />
          <Box marginTop="21px">
            {comments?.map((comment) => (
              <HStack key={comment.id} justify={"space-between"}>
                <Text
                  as="p"
                  marginTop="2"
                  color={useColorModeValue("gray.700", "gray.200")}
                  fontSize="lg"
                >
                  {comment.content}
                </Text>

                <BlogAuthor
                  key={comment.id}
                  name={comment.user.firstName + " " + comment.user.lastName}
                  date={new Date(Date.parse(comment.updatedAt))}
                  avatarUrl={comment.user.profile.avatar.url}
                />
              </HStack>
            ))}
          </Box>
        </Collapse>
        <Divider marginTop="21px" />
      </Box>
    </Box>
  );
}
