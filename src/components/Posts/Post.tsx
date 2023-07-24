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
  const mylike = likes.find((like) => like.userId === authorId);
  const [liked, setLiked] = React.useState(mylike ? true : false);
  const [numLikes, setNumLikes] = React.useState(likes.length);
  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);

  const [commented, setCommented] = React.useState(false);

  const tagNames = tags.map((tag) => tag.name);

  // Update the likes in the database every 10 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (liked) {
        like({
          variables: {
            postId: id,
          },
        });
      } else {
        unlike({
          variables: {
            postId: id,
          },
        });
      }
    }, 10000); // 10000 milliseconds = 10 seconds

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [liked, id, like, unlike]);

  const handleLike = () => {
    setLiked((prev) => !prev);

    if (liked) {
      setNumLikes((prev) => prev - 1);
    } else {
      setNumLikes((prev) => prev + 1);
    }
  };

  const handleComment = () => {
    setCommented((prev) => !prev);
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
              <Box onClick={handleComment}>
                {commented ? (
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
            date={new Date(Date.parse(updatedAt))}
            avatarUrl={user.profile.avatar.url}
          />
        </HStack>
        <Divider marginTop="21px" />
      </Box>
    </Box>
  );
}
