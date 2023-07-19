/** @format */

import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
  InputRightElement,
  Container,
  VStack,
  Img,
  Avatar,
  Text,
  Stack,
  HStack,
} from "@chakra-ui/react";
import React from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { GiCancel, GiLog } from "react-icons/gi";

const penStyle = {
  cursor: "pointer",
};

const INFO = {
  firstName: "John",
  lastName: "Doe",
  email: "jdoe@domain.com",

  bio: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa tenetur commodi impedit alias fugiat corrupti iure maxime eveniet neque harum.",
};

const FORMHTML = {
  firstName: {
    before: <Text fontWeight={"semibold"}>{INFO.firstName}</Text>,
    after: (
      <Input
        id="first-name"
        placeholder="First name"
        defaultValue={INFO.firstName}
      />
    ),
  },

  lastName: {
    before: <Text fontWeight={"semibold"}>{INFO.lastName}</Text>,
    after: (
      <Input
        id="last-name"
        placeholder="Last name"
        defaultValue={INFO.lastName}
      />
    ),
  },

  email: {
    before: <Text fontWeight={"semibold"}>{INFO.email}</Text>,
    after: (
      <Input
        id="email"
        placeholder="xxx@example.com"
        defaultValue={INFO.email}
      />
    ),
  },

  bio: {
    before: <Text fontWeight={"semibold"}>{INFO.bio}</Text>,
    after: (
      <Textarea
        id="bio"
        placeholder="Tell us about yourself..."
        defaultValue={INFO.bio}
      />
    ),
  },
};

export default function Setting() {
  const [toggleEdit, setToggleEdit] = React.useState(false);

  const handleToggleEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleSave = (e: Event) => {
    e.preventDefault();
    console.log("save");
  };

  return (
    <Container maxW={"7xl"} p="12" minH={"80vh"}>
      <Heading as="h1" marginBottom={2}>
        Settings
      </Heading>
      <VStack>
        <Heading w="100%" textAlign={"center"} fontWeight="normal">
          Edit your profile
        </Heading>
        <SimpleGrid columns={1} spacing={6} maxW={{ md: "60%", lg: "45%" }}>
          <Avatar
            borderRadius="full"
            boxSize="150px"
            border={"5px solid "}
            mx={"auto"}
            my={6}
            src="https://100k-faces.glitch.me/random-image"
          />

          <Flex>
            <FormControl mr="5%">
              <FormLabel htmlFor="first-name" fontWeight={"normal"}>
                First name
              </FormLabel>

              {toggleEdit
                ? FORMHTML.firstName.after
                : FORMHTML.firstName.before}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="last-name" fontWeight={"normal"}>
                Last name
              </FormLabel>

              {toggleEdit ? FORMHTML.lastName.after : FORMHTML.lastName.before}
            </FormControl>
          </Flex>

          <FormControl>
            <FormLabel htmlFor="email" fontWeight={"normal"}>
              Email
            </FormLabel>
            {toggleEdit ? FORMHTML.email.after : FORMHTML.email.before}
          </FormControl>

          <FormControl>
            <FormLabel htmlFor="bio" fontWeight={"normal"}>
              Bio
            </FormLabel>
            {toggleEdit ? FORMHTML.bio.after : FORMHTML.bio.before}
            <FormHelperText>
              Brief description for your profile. URLs are hyperlinked.
            </FormHelperText>
          </FormControl>

          <ButtonGroup>
            {toggleEdit ? (
              <HStack justify={"space-between"} w={"full"}>
                <Button
                  leftIcon={<GiCancel />}
                  colorScheme="red"
                  variant="outline"
                  onClick={handleToggleEdit}
                >
                  Cancel
                </Button>
                <Button
                  leftIcon={<AiFillSave />}
                  colorScheme="blue"
                  variant="outline"
                  onClick={handleSave}
                >
                  Save
                </Button>
              </HStack>
            ) : (
              <Button
                leftIcon={<AiFillEdit />}
                colorScheme="teal"
                variant="outline"
                onClick={handleToggleEdit}
              >
                Edit
              </Button>
            )}
          </ButtonGroup>
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
