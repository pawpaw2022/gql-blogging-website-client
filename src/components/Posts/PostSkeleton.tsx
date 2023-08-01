/** @format */

import { Box, Divider, SkeletonCircle, SkeletonText } from "@chakra-ui/react";

type Props = {
  nums: number;
};

export default function PostSkeleton({ nums }: Props) {
  const arr = Array(nums).fill(0);

  return (
    <>
      {arr.map((_, i) => (
        <Box key={i}>
          <Box p={5} shadow="md" borderWidth="1px" my={8}>
            <SkeletonCircle size="10" />
            <SkeletonText mt="4" noOfLines={4} spacing="4" />
          </Box>
          <Divider my={8} />
        </Box>
      ))}
    </>
  );
}
