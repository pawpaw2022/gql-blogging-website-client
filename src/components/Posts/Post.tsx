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
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComments, FaRegComments } from "react-icons/fa";

import { BlogAuthor } from "./BlogAuthor";
import { PostType } from "../../api/types";
import { useLike } from "./Hooks/useLike";
import Comments from "./Comments";

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
  id,
  tags,
  user,
  updatedAt,
}: PostType) {
  const toast = useToast();

  // like control
  const { handleLike, liked, numLikes } = useLike(likes, id, toast);

  // comment control
  const { isOpen, onToggle } = useDisclosure();
  const [numComments, setNumComments] = React.useState(comments.length);

  // tags control
  const tagNames = tags.map((tag) => tag.name);

  return (
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
          />
        </Box>
      </Collapse>
      <Divider my={8} />
    </Box>
  );
}
