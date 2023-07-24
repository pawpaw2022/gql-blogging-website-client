/** @format */

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";
import { NavLink, Navigate } from "react-router-dom";
import React, { useState } from "react";
import { SIGN_IN } from "../../api/mutation";
import { useMutation } from "@apollo/client";
import { AuthType } from "../../api/types";
import Alert from "../Widgets/Alert";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [signin, { data, loading, error }] = useMutation<AuthType>(SIGN_IN);

  if (loading) return "Signin...";
  if (error) return `Signin error! ${error.message}`;

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      signin({
        variables: {
          email,
          password,
        },
      });

      setIsLoading(false);
    }, 1000); // simulate loading

    // clear inputs
    setEmail("");
    setPassword("");
  };

  // token
  // console.log(data);

  if (data?.signin.token) {
    localStorage.setItem("token", data.signin.token);
    window.location.href = "/posts";
  }

  if (localStorage?.getItem("token")) {
    return <Navigate to="/posts" />;
  }

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={10} px={6}>
        <Stack align={"center"}>
          <Img h={"50px"} objectFit="cover" src={logo} alt="logo" />
          <Heading fontSize={"4xl"}>Sign in to your account</Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to toss fun things in a bowl 😍
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {data?.signin.error && (
              <Alert status="error" message={data?.signin.error.message} />
            )}
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Stack spacing={10}>
              <Stack
                direction={{ base: "column", sm: "row" }}
                align={"start"}
                justify={"space-between"}
              >
                <Checkbox>Remember me</Checkbox>
                <Link color={"blue.400"}>Forgot password?</Link>
              </Stack>
              <Button
                as={"button"}
                loadingText="Just a moment..."
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                isLoading={isLoading}
                onClick={handleSubmit}
              >
                Sign in
              </Button>
            </Stack>
            <Stack pt={2}>
              <Text align={"center"}>
                Don&apos;t have an account? &nbsp;
                <NavLink to="/signup" color={"blue.400"}>
                  Signup
                </NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
