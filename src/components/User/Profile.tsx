/** @format */

import {
  Box,
  Container,
  Divider,
  Heading,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import AvatarWRipple from "./Avatar";
import { Navigate } from "react-router-dom";
import { ProfileType } from "../../api/types";
import { GET_ME_PROFILE } from "../../api/query";
import { useQuery } from "@apollo/client";
import Post from "../Posts/Post";

export default function Profile() {
  if (!localStorage?.getItem("token")) {
    return <Navigate to="/signin" />;
  }

  // get user's profile
  const { data: profileData } = useQuery<ProfileType>(GET_ME_PROFILE);

  const me = profileData
    ? {
        name: profileData.me.firstName + " " + profileData.me.lastName,
        email: profileData.me.email,
        bio: profileData.me.profile.bio,
        avatarUrl: profileData.me.profile.avatar.url,
        createdAt: profileData.me.createdAt,
        posts: profileData.me.posts,
        likedPosts: profileData.me.likes.posts,
      }
    : {
        name: "",
        email: "",
        bio: "",
        avatarUrl: "",
        createdAt: "",
        posts: [],
        likedPosts: [],
      };

  return (
    <Container maxW={"7xl"} p="12">
      <Heading as="h1" marginBottom={2}>
        Profile
      </Heading>

      <VStack>
        <AvatarWRipple name={me.name} avatarUrl={me.avatarUrl} />

        <Heading
          as="h2"
          color={useColorModeValue("gray.800", "gray.200")}
          mb={2}
        >
          {me.name}
        </Heading>
        <Text color={useColorModeValue("gray.600", "gray.400")} mb={4}>
          {me.email}
        </Text>

        <Text color={useColorModeValue("gray.600", "gray.400")} mb={4}>
          Since: {new Date(me.createdAt).toLocaleDateString()}
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
          align={"center"}
        >
          {me.bio}
        </Text>
      </VStack>

      <Divider my={8} />

      <Box mt={8}>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>
              <Heading
                as="h2"
                color={useColorModeValue("gray.800", "gray.200")}
                my={2}
                mx={{ base: 2, md: 4 }}
              >
                My Feeds ✍️
              </Heading>
            </Tab>
            <Tab>
              <Heading
                as="h2"
                color={useColorModeValue("gray.800", "gray.200")}
                my={2}
                mx={{ base: 2, md: 4 }}
              >
                My Likes ❤️
              </Heading>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>feeds</p>
            </TabPanel>
            <TabPanel>
              <p>Likes</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
