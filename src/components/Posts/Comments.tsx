/** @format */

import {
  Box,
  Container,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { BsFillSendFill, BsSend } from "react-icons/bs";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADDCOMMENT } from "../../api/mutation";
import { CommentType } from "../../api/types";
import Comment from "./Comment";

const sendStyle = {
  color: "dodgerblue",
  cursor: "pointer",
};

type Props = {
  id: string;

  comments: {
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
  }[];

  toast: any;
  setNumComments: React.Dispatch<React.SetStateAction<number>>;
};

export default function Comments({
  comments,
  toast,
  id: postId,
  setNumComments,
}: Props) {
  const [addComment, { data }] = useMutation<CommentType>(ADDCOMMENT);

  // update the comments when the user adds a new comment
  useEffect(() => {
    if (data?.createComment.comment) {
      setUiComments((prev) => [data.createComment.comment, ...prev]);
    }
  }, [data?.createComment.comment]);

  const [uiComments, setUiComments] = useState(comments);
  const [hoverSend, setHoverSend] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleSend = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // check if the user is logged in
    if (!localStorage.getItem("token")) {
      toast({
        position: "top",
        title: "Invalid action",
        description: "You must be logged in to comment a post.",
        status: "error",
        duration: 9000, // 9 seconds
        isClosable: true,
      });

      setCommentInput("");
      return;
    }

    // check if the comment is empty
    if (commentInput.trim() === "") {
      toast({
        position: "top",
        title: "Empty comment",
        description: "You must write something to comment a post.",
        status: "warning",
        duration: 9000, // 9 seconds
        isClosable: true,
      });

      setCommentInput("");
      return;
    }

    // store the comment in the database
    addComment({
      variables: {
        postId,
        content: commentInput,
      },
    });

    // update the number of comments
    setNumComments((prev) => prev + 1);

    setCommentInput("");

    toast({
      position: "top",
      title: "Comment added",
      description: "Your comment has been added.",
      status: "success",
      duration: 9000, // 9 seconds
      isClosable: true,
    });
  };

  if (data?.createComment.error) {
    toast({
      position: "top",
      title: "Error",
      description: data.createComment.error.message,
      status: "error",
      duration: 9000, // 9 seconds
      isClosable: true,
    });
  }

  return (
    <>
      <Divider my="21px" />
      <Container ml={0}>
        <InputGroup size="lg">
          <Input
            pr="4.5rem"
            placeholder="Say something about it..."
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <InputRightElement>
            <Box
              onMouseEnter={() => setHoverSend(true)}
              onMouseLeave={() => setHoverSend(false)}
              onClick={handleSend}
            >
              {hoverSend ? (
                <BsFillSendFill style={sendStyle} size={25} />
              ) : (
                <BsSend style={sendStyle} size={25} />
              )}
            </Box>
          </InputRightElement>
        </InputGroup>
        <Box marginTop="21px">
          {uiComments?.map((comment) => (
            <Comment
              comment={comment}
              key={comment.id}
              setUiComments={setUiComments}
              setNumComments={setNumComments}
              toast={toast}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}
