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
import { ADDCOMMENT, DELETECOMMENT } from "../../api/mutation";
import { CommentType } from "../../api/types";
import Comment from "./Comment";
import { toastToast } from "./Hooks/useToast";

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
  const [addComment, { data: addData }] = useMutation<CommentType>(ADDCOMMENT);
  const [deleteComment, { data: deleteData }] =
    useMutation<CommentType>(DELETECOMMENT);

  // update the comments when the user adds a new comment
  useEffect(() => {
    if (addData?.createComment.comment) {
      setUiComments((prev) => [addData.createComment.comment, ...prev]);
      toastToast({
        toast,
        title: "Comment added",
        description: "Your comment has been added.",
        status: "success",
      });
    }
  }, [addData?.createComment.comment]);

  useEffect(() => {
    if (deleteData?.deleteComment.comment) {
      if (deleteData?.deleteComment.comment) {
        toastToast({
          toast,
          title: "Comment deleted",
          description: "Your comment has been deleted.",
          status: "success",
        });
      }
    }
  }, [deleteData?.deleteComment.comment]);

  const [uiComments, setUiComments] = useState(comments);
  const [hoverSend, setHoverSend] = useState(false);
  const [commentInput, setCommentInput] = useState("");

  const handleSend = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    // check if the user is logged in
    if (!localStorage.getItem("token")) {
      toastToast({
        toast,
        title: "Invalid action",
        description: "You must be logged in to comment a post.",
        status: "error",
      });

      setCommentInput("");
      return;
    }

    // check if the comment is empty
    if (commentInput.trim() === "") {
      toastToast({
        toast,
        title: "Invalid action",
        description: "You must write something to comment a post.",
        status: "error",
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
  };

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
              deleteComment={deleteComment}
            />
          ))}
        </Box>
      </Container>
    </>
  );
}
