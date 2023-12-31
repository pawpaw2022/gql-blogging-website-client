/** @format */

import { useMutation, useQuery } from "@apollo/client";
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
  useToast,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { AiFillEdit, AiFillSave } from "react-icons/ai";
import { GiCancel } from "react-icons/gi";
import { Navigate } from "react-router-dom";
import { GET_ALL_AVATARS, GET_ME_SETTING } from "../../api/query";
import {
  AssignAvatarType,
  AvatarsType,
  SettingType,
  UpdateUserType,
} from "../../api/types";
import { ASSIGNAVATAR, UPDATEUSER } from "../../api/mutation";
import { toastToast } from "../Posts/Hooks/useToast";

export default function Setting() {
  const { data: settingData } = useQuery<SettingType>(GET_ME_SETTING);
  const { data: avatarData } = useQuery<AvatarsType>(GET_ALL_AVATARS);

  const [updateUser, { data: updateData }] =
    useMutation<UpdateUserType>(UPDATEUSER);

  const [assignAvatar, { data: assignData }] =
    useMutation<AssignAvatarType>(ASSIGNAVATAR);

  const toast = useToast();

  const [toggleEdit, setToggleEdit] = React.useState(false);
  const [form, setForm] = React.useState({
    firstName: "",
    lastName: "",
    bio: "",
    avatarUrl: "",
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (settingData) {
      setForm({
        firstName: settingData.me.firstName,
        lastName: settingData.me.lastName,
        bio: settingData.me.profile.bio,
        avatarUrl: settingData.me.profile.avatar.url,
      });
    }
  }, [settingData]);

  const handleToggleEdit = () => {
    setToggleEdit((prev) => !prev);
  };

  const handleSave = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    updateUser({
      variables: {
        firstName: form.firstName,
        lastName: form.lastName,
        bio: form.bio,
      },
    });

    setToggleEdit((prev) => !prev);
  };

  useEffect(() => {
    if (assignData?.assignAvatar.profile) {
      toastToast({
        title: "Avatar changed.",
        description: "Your avatar has been changed.",
        status: "success",
        toast,
      });
    }
  }, [assignData?.assignAvatar]);

  useEffect(() => {
    if (updateData?.updateUser.profile) {
      toastToast({
        title: "Profile updated.",
        description: "Your profile has been updated.",
        status: "success",
        toast,
      });
    }
  }, [updateData?.updateUser.profile]);

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
          <Tooltip
            hasArrow
            placement="bottom-end"
            label="Change your avatar!"
            aria-label="A tooltip"
          >
            <Avatar
              borderRadius="full"
              boxSize="150px"
              border={"5px solid "}
              cursor={"pointer"}
              mx={"auto"}
              my={6}
              name={settingData?.me.firstName + " " + settingData?.me.lastName}
              onClick={onOpen}
              src={form.avatarUrl}
            />
          </Tooltip>

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
              <HStack justify={"space-between"} w={"full"}>
                <Button
                  leftIcon={<AiFillEdit />}
                  colorScheme="teal"
                  variant="outline"
                  onClick={handleToggleEdit}
                >
                  Edit
                </Button>
              </HStack>
            )}
          </ButtonGroup>
        </SimpleGrid>
      </VStack>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Change your avatar</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid columns={{ base: 3, md: 4 }} spacing={6}>
              {avatarData?.avatars.map((avatar) => (
                <Avatar
                  key={avatar.id}
                  w={"full"}
                  h={"full"}
                  cursor={"pointer"}
                  src={avatar.url}
                  onClick={() => {
                    assignAvatar({
                      variables: {
                        avatarId: avatar.id,
                      },
                    });

                    setForm({ ...form, avatarUrl: avatar.url });
                    onClose();
                  }}
                />
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="teal"
              onClick={() => {
                onClose();
              }}
            >
              Confirm
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Container>
  );
}
