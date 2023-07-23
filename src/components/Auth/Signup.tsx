/** @format */

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { NavLink, Navigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { useMutation } from "@apollo/client";
import { SIGN_UP } from "../../api/mutation";
import Alert from "../Widgets/Alert";
import { AuthType } from "../../api/types";

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [signup, { data, loading, error }] = useMutation<AuthType>(SIGN_UP);

  if (loading) return "Signup...";
  if (error) return `Signup error! ${error.message}`;

  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    setIsLoading(true);

    setTimeout(() => {
      signup({
        variables: {
          firstName,
          lastName,
          email,
          password,
        },
      });

      setIsLoading(false);
    }, 1000); // simulate loading

    // clear inputs
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  };

  if (data?.signup.token) {
    localStorage.setItem("token", data.signup.token);
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

          <Heading mt={2} fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            {data?.signup?.error.message && (
              <Alert status="error" message={data?.signup?.error.message} />
            )}
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Just a moment..."
                size="lg"
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}
                onClick={handleSubmit}
                isLoading={isLoading}
              >
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <NavLink to="/signin" color={"blue.400"}>
                  Login
                </NavLink>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
