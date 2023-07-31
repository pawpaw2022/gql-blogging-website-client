/** @format */

import {
  Avatar,
  Button,
  Editable,
  EditablePreview,
  EditableTextarea,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { MeType } from "../../../api/types";
import { GET_ME_ID } from "../../../api/query";
import { useQuery } from "@apollo/client";
import { EditableControls } from "./EditableControls";
import { toastToast } from "../Hooks/useToast";

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

  updateComment: (options?: {
    variables?: {
      commentId: string;
      content: string;
    };
  }) => Promise<any>;

  deleteComment: (options?: {
    variables?: {
      commentId: string;
    };
  }) => Promise<any>;

  toast: any;

  meId: string;
};

export default function Comment({
  comment,
  setUiComments,
  setNumComments,
  deleteComment,
  updateComment,
  toast,
  meId,
}: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  // check if the user owns the comment
  let owned = false;
  if (localStorage.getItem("token")) {
    if (meId) {
      owned = meId === comment.userId;
    }
  }

  // delete the comment
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
  const originalComment = comment.content;
  const [uiComment, setUiComment] = useState(originalComment);

  const handleEditSubmit = () => {
    const stale = uiComment !== originalComment;

    if (stale) {
      // check if comment is empty
      if (uiComment === "") {
        toastToast({
          title: "No Empty",
          status: "error",
          description: "Comment cannot be empty",
          toast,
        });

        return;
      }

      // update to database
      updateComment({
        variables: {
          commentId: comment.id,
          content: uiComment,
        },
      });
    }
  };

  return (
    <>
      <HStack justify={"space-between"} my={2}>
        {owned ? (
          <HStack justify={"space-between"} w="full">
            <Editable
              defaultValue={uiComment}
              submitOnBlur={true}
              onSubmit={handleEditSubmit}
              value={uiComment}
              onChange={(e) => setUiComment(e)}
              display={"flex"}
              justifyContent={"space-between"}
              fontSize={{ base: "sm", sm: "md" }}
              w="full"
            >
              <HStack
                maxW={{ base: "18ch", sm: "22ch", md: "30ch", lg: "40ch" }}
              >
                <EditablePreview overflowX={"auto"} />
                <Input
                  as={EditableTextarea}
                  py={4}
                  px={2}
                  w={{ base: "18ch", sm: "22ch", md: "30ch", lg: "40ch" }}
                />
              </HStack>

              <EditableControls onOpen={onOpen} />
            </Editable>
          </HStack>
        ) : (
          <Text
            as="p"
            marginTop="2"
            fontSize={{ base: "sm", sm: "md" }}
            maxW={{ base: "20ch", md: "30ch", lg: "40ch" }}
            overflowX={"auto"}
          >
            {comment.content}
          </Text>
        )}

        <Avatar
          src={comment.user.profile.avatar.url}
          name={comment.user.firstName + " " + comment.user.lastName}
          top={0}
          size={{ base: "sm", md: "md" }}
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
