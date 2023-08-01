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
} from "@chakra-ui/react";
import AvatarWRipple from "./Avatar";
import { Navigate } from "react-router-dom";
import { PostType, ProfileType } from "../../api/types";
import { GET_ME_PROFILE } from "../../api/query";
import { useQuery } from "@apollo/client";
import { useState } from "react";
import { useEffect } from "react";
import Posts from "./Posts";
import PostSkeleton from "../Posts/PostSkeleton";

export default function Profile() {
  if (!localStorage?.getItem("token")) {
    return <Navigate to="/signin" />;
  }

  // get user's profile
  const {
    loading,
    error,
    data: profileData,
  } = useQuery<ProfileType>(GET_ME_PROFILE);

  const me = profileData
    ? {
        name: profileData.me.firstName + " " + profileData.me.lastName,
        email: profileData.me.email,
        bio: profileData.me.profile.bio,
        avatarUrl: profileData.me.profile.avatar.url,
        createdAt: profileData.me.createdAt,
      }
    : {
        name: "",
        email: "",
        bio: "",
        avatarUrl: "",
        createdAt: "",
      };

  const [myPosts, setMyPosts] = useState<PostType[]>([]);
  const [myLikedPosts, setMyLikedPosts] = useState<PostType[]>([]);

  useEffect(() => {
    if (profileData?.me) {
      // Sort the posts by updatedAt date in descending order

      const sortedMyPosts = [...profileData.me.posts]?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      const likedPosts = profileData.me.likes
        .map((like) => like.posts)
        .map((post) => post[0]);

      const sortedLikedPosts = [...likedPosts]?.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );

      setMyPosts(sortedMyPosts);
      setMyLikedPosts(sortedLikedPosts);
    }
  }, [profileData]);

  const postsElement = {
    myPosts:
      myPosts.length === 0 ? (
        <Text
          color={useColorModeValue("gray.600", "gray.400")}
          mb={4}
          mt={8}
          fontSize={"lg"}
          align={"center"}
        >
          It seems like you have not posted anything yet. <br />
          Start posting now!
        </Text>
      ) : (
        <Posts posts={myPosts} setPosts={setMyPosts} />
      ),

    likedPosts:
      myLikedPosts.length === 0 ? (
        <Text
          color={useColorModeValue("gray.600", "gray.400")}
          mb={4}
          mt={8}
          fontSize={"lg"}
          align={"center"}
        >
          It seems like you have not liked anything yet. 💔
        </Text>
      ) : (
        <Posts posts={myLikedPosts} setPosts={setMyLikedPosts} />
      ),
  };

  if (error) return <p>Error :{error.message}</p>;

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
              {!loading ? postsElement.myPosts : <PostSkeleton nums={3} />}
            </TabPanel>
            <TabPanel>
              {!loading ? postsElement.likedPosts : <PostSkeleton nums={3} />}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}
