/** @format */

import {
  Avatar,
  Collapse,
  VStack,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";

export default function AvatarOnNav() {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <>
      <VStack>
        <Avatar
          border={"2px solid"}
          borderColor={useColorModeValue("gray.200", "gray.900")}
          src="https://100k-faces.glitch.me/random-image"
          cursor={"pointer"}
          onClick={onToggle}
        />
        <Collapse in={isOpen} animateOpacity>
          Open
        </Collapse>
      </VStack>
    </>
  );
}
