/** @format */

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Popover,
  PopoverTrigger,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Img,
  HStack,
  Avatar,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.png";

import DarkModeToggle from "./DarkModeToggle";
import { GET_ME_AVATAR } from "../../api/query";
import { MeType } from "../../api/types";
import { useQuery } from "@apollo/client";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const { isOpen: isOpenAvatar, onToggle: onToggleAvatar } = useDisclosure();
  const auth = localStorage.getItem("token");

  // get user's avatar
  const { data: meData } = useQuery<MeType>(GET_ME_AVATAR);

  return (
    <Box w={"100vw"}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"60px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          justify={{ base: "center", md: "start" }}
          align={"center"}
        >
          <NavLink to="/posts">
            <Text
              textAlign={useBreakpointValue({ base: "center", md: "left" })}
              fontFamily={"heading"}
              color={useColorModeValue("gray.800", "white")}
            >
              <Img w={"100px"} objectFit="cover" src={logo} alt="logo" />
            </Text>
          </NavLink>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={"flex-end"}
          direction={"row"}
          spacing={{ base: 2, md: 6 }}
        >
          <DarkModeToggle />

          {auth ? (
            <Avatar
              border={"2px solid"}
              ml={2}
              name={meData?.me?.firstName + " " + meData?.me?.lastName}
              borderColor={useColorModeValue("gray.200", "gray.900")}
              src={meData?.me && meData?.me?.profile.avatar.url}
              cursor={"pointer"}
              onClick={onToggleAvatar}
            />
          ) : (
            <HStack>
              <NavLink to="/signin">
                <Button fontSize={"sm"} fontWeight={400}>
                  Sign In
                </Button>
              </NavLink>
              <NavLink to="/signup">
                <Button
                  display={{ base: "none", md: "inline-flex" }}
                  fontSize={"sm"}
                  fontWeight={600}
                  color={"white"}
                  bg={"black"}
                  _hover={{
                    bg: "gray.800",
                  }}
                >
                  Sign Up
                </Button>
              </NavLink>
            </HStack>
          )}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav onToggle={onToggle} />
      </Collapse>
      <Collapse in={isOpenAvatar} animateOpacity>
        <AvatarNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <NavLink to={navItem.href ?? "#"}>
                <Text
                  p={2}
                  fontSize={"md"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Text>
              </NavLink>
            </PopoverTrigger>
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const MobileNav = ({ onToggle }: { onToggle: () => void }) => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} onToggle={onToggle} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, href, onToggle }: NavItem) => {
  return (
    <Stack spacing={4}>
      <NavLink to={href}>
        <Flex
          py={2}
          justify={"space-between"}
          align={"center"}
          _hover={{
            textDecoration: "none",
          }}
          onClick={onToggle}
        >
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
          >
            {label}
          </Text>
        </Flex>
      </NavLink>
    </Stack>
  );
};

const AvatarNav = () => {
  return (
    <HStack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      justify={"flex-end"}
    >
      <Button
        fontWeight={600}
        color={useColorModeValue("gray.600", "gray.200")}
        colorScheme="pink"
        variant="ghost"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/signin";
        }}
      >
        Sign Out
      </Button>
    </HStack>
  );
};

interface NavItem {
  label: string;
  href: string;
  onToggle?: () => void;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: "Home",
    href: "/home",
  },
  {
    label: "Posts",
    href: "/posts",
  },
  {
    label: "Profile",
    href: "/profile",
  },
  {
    label: "Settings",
    href: "/settings",
  },
];
