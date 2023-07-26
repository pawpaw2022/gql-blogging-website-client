/** @format */

import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useEditableControls,
} from "@chakra-ui/react";
import React from "react";
import {
  RiDeleteBin6Fill,
  RiDeleteBin6Line,
  RiEditBoxFill,
  RiEditBoxLine,
} from "react-icons/ri";
import { BlogAuthor } from "./BlogAuthor";
import { useState } from "react";
import { MeType } from "../../api/types";
import { GET_ME_ID } from "../../api/query";
import { useQuery } from "@apollo/client";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";

type Props = {
  comment: {
    content: string;
    id: string;
    postId: string;
    userId: string;
    updatedAt: string;
    user: {
      firstName: string;
      lastName: string;
      profile: {
        avatar: {
          url: string;
        };
      };
    };
  };

  setUiComments: React.Dispatch<
    React.SetStateAction<
      {
        content: string;
        id: string;
        postId: string;
        userId: string;
        updatedAt: string;
        user: {
          firstName: string;
          lastName: string;
          profile: {
            avatar: {
              url: string;
            };
          };
        };
      }[]
    >
  >;

  setNumComments: React.Dispatch<React.SetStateAction<number>>;

  deleteComment: (options?: {
    variables?: {
      commentId: string;
    };
  }) => Promise<any>;
};

const deleteStyle = {
  cursor: "pointer",
};

export default function Comment({
  comment,
  setUiComments,
  setNumComments,
  deleteComment,
}: Props) {
  const { data: meData } = useQuery<MeType>(GET_ME_ID);
  const { isOpen, onOpen, onClose } = useDisclosure();

  // check if the user owns the comment
  let owned = false;
  if (localStorage.getItem("token")) {
    if (meData?.me) {
      owned = meData.me.id === comment.userId;
    }
  }

  // delete the comment
  const [hoverDelete, setHoverDelete] = useState(false);
  const handleDelete = () => {
    setUiComments((prev) => prev.filter((c) => c.id !== comment.id));
    setNumComments((prev) => prev - 1);

    deleteComment({
      variables: {
        commentId: comment.id,
      },
    });
  };

  // edit the comment
  const [hoverEdit, setHoverEdit] = useState(false);
  const handleEdit = () => {
    console.log("edit");
  };

  //   const { isEditing } = useEditableControls();

  //   console.log(isEditing);

  function EditableControls() {
    const {
      isEditing,
      getSubmitButtonProps,
      getCancelButtonProps,
      getEditButtonProps,
    } = useEditableControls();

    return isEditing ? (
      <ButtonGroup justifyContent="center" ml="2">
        <IconButton
          colorScheme="teal"
          variant="ghost"
          aria-label="submit edit"
          icon={<AiOutlineCheck {...getSubmitButtonProps()} size={25} />}
        />
        <IconButton
          colorScheme="pink"
          variant="ghost"
          aria-label="cancel edit"
          icon={<AiOutlineClose {...getCancelButtonProps()} size={25} />}
        />
      </ButtonGroup>
    ) : (
      <HStack>
        <IconButton
          colorScheme="teal"
          variant="ghost"
          aria-label=" edit"
          icon={<RiEditBoxLine {...getEditButtonProps()} size={25} />}
        />

        <IconButton
          colorScheme="pink"
          variant="ghost"
          aria-label="delete edit"
          onClick={onOpen}
          icon={<RiDeleteBin6Line {...getCancelButtonProps()} size={25} />}
        />
      </HStack>
    );
  }

  return (
    <>
      <HStack justify={"space-between"}>
        {owned ? (
          <HStack justify={"space-between"} w="full">
            <Editable
              defaultValue={comment.content}
              display={"flex"}
              justifyContent={"space-between"}
              fontSize={{ base: "sm", sm: "md" }}
              w="full"
            >
              <HStack w={"full"}>
                <EditablePreview />
                <Input as={EditableTextarea} />
              </HStack>
              <EditableControls />
            </Editable>
          </HStack>
        ) : (
          <Text as="p" marginTop="2" fontSize={{ base: "sm", sm: "md" }}>
            {comment.content}
          </Text>
        )}

        <BlogAuthor
          key={comment.id}
          name={comment.user.firstName + " " + comment.user.lastName}
          date={new Date(Date.parse(comment.updatedAt))}
          avatarUrl={comment.user.profile.avatar.url}
        />
      </HStack>
      <Modal
        isCentered
        isOpen={isOpen}
        onClose={onClose}
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Are you sure?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Once deleted, you will not be able to recover this comment!
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="red" onClick={handleDelete}>
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
