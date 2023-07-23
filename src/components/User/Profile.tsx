/** @format */

import {
  Container,
  Divider,
  Heading,
  Text,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import Post from "../Posts/Post";
import AvatarWRipple from "./Avatar";
import { Navigate } from "react-router-dom";

export default function Profile() {
  if (!localStorage?.getItem("token")) {
    return <Navigate to="/signin" />;
  }

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1" marginBottom={2}>
        Profile
      </Heading>

      <VStack>
        <AvatarWRipple />

        <Heading
          as="h2"
          color={useColorModeValue("gray.800", "gray.200")}
          mb={2}
        >
          John Doe
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.400")} mb={4}>
          jdoe@domain.com
        </Text>

        <Text
          as="h2"
          fontSize="1.5rem"
          color={useColorModeValue("gray.800", "gray.200")}
          mt={2}
        >
          Bio
        </Text>
        <Text
          w={{ base: "90%", md: "60%" }}
          color={useColorModeValue("gray.600", "gray.400")}
          mb={4}
          fontStyle={"italic"}
        >
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa tenetur
          commodi impedit alias fugiat corrupti iure maxime eveniet neque harum.
        </Text>
      </VStack>

      <Divider my={8} />

      <VStack mt={8}>
        <Heading
          as="h2"
          color={useColorModeValue("gray.800", "gray.200")}
          my={2}
        >
          My Feeds
        </Heading>

        {/* <Post />
        <Post /> */}
      </VStack>
    </Container>
  );
}
