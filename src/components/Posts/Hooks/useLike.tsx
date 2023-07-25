/** @format */

import { useEffect, useState } from "react";
import { MeType } from "../../../api/types";
import { useMutation, useQuery } from "@apollo/client";
import { LIKE, UNLIKE } from "../../../api/mutation";
import { GET_ME_ID } from "../../../api/query";

interface LikeType {
  id: string;
  postId: string;
  userId: string;
}
[];

export const useLike = (likes: LikeType[], id: string, toast: any) => {
  const { data: meData } = useQuery<MeType>(GET_ME_ID);

  // set the initial state of the like button
  useEffect(() => {
    if (meData?.me) {
      const isLiked = likes.some((like) => like.userId === meData.me.id);
      setLiked(isLiked);
    }
  }, [meData, likes]);

  const [liked, setLiked] = useState(false);
  const [numLikes, setNumLikes] = useState(likes.length);
  const [like] = useMutation(LIKE);
  const [unlike] = useMutation(UNLIKE);

  // update the like button when the user likes or unlikes a post
  const handleLike = () => {
    // check if the user is logged in
    if (!localStorage.getItem("token")) {
      toast({
        position: "top",
        title: "Invalid action",
        description: "You must be logged in to like a post.",
        status: "error",
        duration: 9000, // 9 seconds
        isClosable: true,
      });
      return;
    }

    setLiked((prev) => !prev);

    if (liked) {
      setNumLikes((prev) => prev - 1);

      unlike({
        variables: {
          postId: id,
        },
      });
    } else {
      setNumLikes((prev) => prev + 1);

      like({
        variables: {
          postId: id,
        },
      });
    }
  };
  return { handleLike, liked, numLikes };
};
