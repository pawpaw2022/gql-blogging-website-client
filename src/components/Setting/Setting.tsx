/** @format */

import { useQuery } from "@apollo/client";
import {
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Textarea,
  FormHelperText,
  Container,
  VStack,
  Avatar,
  Text,
  HStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { Navigate } from "react-router-dom";
import { GET_ME_SETTING } from "../../api/query";
import { SettingType } from "../../api/types";

export default function Setting() {
  const { data: settingData } = useQuery<SettingType>(GET_ME_SETTING);

  const [toggleEdit, setToggleEdit] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
  });

  useEffect(() => {
    if (settingData) {
      setForm({
        firstName: settingData.me.firstName,
        lastName: settingData.me.lastName,
        email: settingData.me.email,
        bio: settingData.me.profile.bio,
      });
    }
  }, [settingData]);

  const handleToggleEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    console.log("save");
    console.log(form);

    setToggleEdit((prev) => !prev);
  };

  if (!localStorage?.getItem("token")) {
    return <Navigate to="/signin" />;
  }

  const FORMHTML = {
    firstName: {
      before: <Text fontWeight={"semibold"}>{form.firstName}</Text>,
      after: (
        <Input
          id="first-name"
          placeholder="First name"
          value={form.firstName}
          onChange={(e) => setForm({ ...form, firstName: e.target.value })}
        />
      ),
    },

    lastName: {
      before: <Text fontWeight={"semibold"}>{form.lastName}</Text>,
      after: (
        <Input
          id="last-name"
          placeholder="Last name"
          value={form.lastName}
          onChange={(e) => setForm({ ...form, lastName: e.target.value })}
        />
      ),
    },

    email: {
      before: <Text fontWeight={"semibold"}>{form.email}</Text>,
      after: (
        <Input
          id="email"
          placeholder="xxx@example.com"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
      ),
    },

    bio: {
      before: <Text fontWeight={"semibold"}>{form.bio}</Text>,
      after: (
        <Textarea
          id="bio"
          placeholder="Tell us about yourself..."
          value={form.bio}
          onChange={(e) => setForm({ ...form, bio: e.target.value })}
        />
      ),
    },
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
            src={settingData?.me.profile.avatar.url}
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
