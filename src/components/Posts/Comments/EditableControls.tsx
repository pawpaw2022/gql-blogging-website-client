/** @format */

import { ButtonGroup, IconButton, useEditableControls } from "@chakra-ui/react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { RiDeleteBin6Line, RiEditBoxLine } from "react-icons/ri";
import { HStack } from "@chakra-ui/react";

type Prop = {
  onOpen: () => void;
};

export const EditableControls = ({ onOpen }: Prop) => {
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
        icon={<AiOutlineCheck size={25} />}
        {...getSubmitButtonProps()}
      />

      <IconButton
        colorScheme="pink"
        variant="ghost"
        aria-label="cancel edit"
        icon={<AiOutlineClose size={25} />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <HStack>
      <IconButton
        colorScheme="teal"
        variant="ghost"
        aria-label="edit"
        icon={<RiEditBoxLine size={25} />}
        {...getEditButtonProps()}
      />

      <IconButton
        colorScheme="pink"
        variant="ghost"
        aria-label="delete edit"
        onClick={onOpen}
        icon={<RiDeleteBin6Line size={25} />}
      />
    </HStack>
  );
};
