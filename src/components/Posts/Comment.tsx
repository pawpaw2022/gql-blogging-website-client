/** @format */

import {
  Box,
  Button,
  HStack,
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
import { CommentType, MeType } from "../../api/types";
import { GET_ME_ID } from "../../api/query";
import { useMutation, useQuery } from "@apollo/client";
import { DELETECOMMENT } from "../../api/mutation";

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

  toast: any;
};

const deleteStyle = {
  cursor: "pointer",
};

export default function Comment({
  comment,
  setUiComments,
  setNumComments,
  toast,
}: Props) {
  const { data: meData } = useQuery<MeType>(GET_ME_ID);
  const [deleteComment] = useMutation<CommentType>(DELETECOMMENT);
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

    toast({
      position: "top",
      title: "Comment deleted",
      description: "Your comment has been deleted.",
      status: "success",
      duration: 9000, // 9 seconds
      isClosable: true,
    });
  };

  // edit the comment
  const [hoverEdit, setHoverEdit] = useState(false);
  const [content, setContent] = useState(comment.content);
  const [editting, setEditting] = useState(false);
  const handleEdit = () => {
    console.log("edit");
    setEditting((prev) => !prev);
  };

  return (
    <>
      <HStack justify={"space-between"}>
        {editting ? (
          <InputGroup size={{ base: "sm", sm: "md" }}>
            <Input
              pr="4.5rem"
              placeholder="Editting comment..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <InputRightElement>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Cancel
              </Button>
            </InputRightElement>
          </InputGroup>
        ) : (
          <Text as="p" marginTop="2" fontSize={{ base: "sm", sm: "md" }}>
            {content}
          </Text>
        )}
        <HStack spacing={4}>
          {owned && !editting && (
            <HStack>
              <Box
                onMouseEnter={() => setHoverEdit(true)}
                onMouseLeave={() => setHoverEdit(false)}
                onClick={handleEdit}
              >
                {hoverEdit ? (
                  <RiEditBoxFill style={deleteStyle} size={25} />
                ) : (
                  <RiEditBoxLine style={deleteStyle} size={25} />
                )}
              </Box>
              <Box
                onMouseEnter={() => setHoverDelete(true)}
                onMouseLeave={() => setHoverDelete(false)}
                onClick={onOpen}
              >
                {hoverDelete ? (
                  <RiDeleteBin6Fill style={deleteStyle} size={25} />
                ) : (
                  <RiDeleteBin6Line style={deleteStyle} size={25} />
                )}
              </Box>
            </HStack>
          )}
          <BlogAuthor
            key={comment.id}
            name={comment.user.firstName + " " + comment.user.lastName}
            date={new Date(Date.parse(comment.updatedAt))}
            avatarUrl={comment.user.profile.avatar.url}
          />
        </HStack>
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
