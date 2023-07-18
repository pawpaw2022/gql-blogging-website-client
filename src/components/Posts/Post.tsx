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
} from "@chakra-ui/react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaComments, FaRegComments } from "react-icons/fa";
import { BlogAuthor } from "./BlogAuthor";

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

export default function Post() {
  const [liked, setLiked] = React.useState(false);
  const [commented, setCommented] = React.useState(false);

  const handleLike = () => {
    setLiked((prev) => !prev);
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
        <BlogTags tags={["Engineering", "Product"]} />
        <Heading marginTop="1">
          <Link textDecoration="none" _hover={{ textDecoration: "none" }}>
            Blog article title
          </Link>
        </Heading>
        <Text
          as="p"
          marginTop="2"
          color={useColorModeValue("gray.700", "gray.200")}
          fontSize="lg"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
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
                6
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
                2
              </Text>
            </HStack>
          </HStack>
          <BlogAuthor name="John Doe" date={new Date("2021-04-06T19:01:27Z")} />
        </HStack>
        <Divider marginTop="21px" />
      </Box>
    </Box>
  );
}
