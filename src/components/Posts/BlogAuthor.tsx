/** @format */

import { Avatar, HStack, Text } from "@chakra-ui/react";

interface BlogAuthorProps {
  date: Date;
  name: string;
}

export const BlogAuthor: React.FC<BlogAuthorProps> = (props) => {
  return (
    <HStack marginTop="2" spacing="2" display="flex" alignItems="center">
      <Avatar
        borderRadius="full"
        boxSize="40px"
        name="John Doe"
        src="https://100k-faces.glitch.me/random-image"
      />
      <Text fontWeight="medium">{props.name}</Text>
      <Text>—</Text>
      <Text>{props.date.toLocaleDateString()}</Text>
    </HStack>
  );
};
