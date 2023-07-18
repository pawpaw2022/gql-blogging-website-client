/** @format */

import { ReactNode } from "react";

import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
  Img,
} from "@chakra-ui/react";
import logo from "../../assets/logo.png";

const ListHeader = ({ children }: { children: ReactNode }) => {
  return (
    <Text fontWeight={"500"} fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.900")}
      color={useColorModeValue("gray.700", "gray.200")}
    >
      <Container as={Stack} maxW={"6xl"} py={10}>
        <SimpleGrid
          templateColumns={{ sm: "1fr 1fr", md: "2fr 1fr 1fr 1fr 1fr" }}
          spacing={8}
        >
          <Stack
            spacing={6}
            gridColumn={{ sm: "1/--", md: "1" }}
            display={"flex"}
            alignItems={"center"}
          >
            <Box>
              <Img h={"60px"} objectFit="cover" src={logo} alt="logo" />
            </Box>
            <Text fontSize={"sm"}>© 2023 FaceBowl. All rights reserved</Text>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Product</ListHeader>
            <Link>Overview</Link>
            <Link>Features</Link>
            <Link>Tutorials</Link>
            <Link>Pricing</Link>
            <Link>Releases</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Company</ListHeader>
            <Link>About</Link>
            <Link>Press</Link>
            <Link>Careers</Link>
            <Link>Contact</Link>
            <Link>Partners</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Support</ListHeader>
            <Link>Help Center</Link>
            <Link>Terms of Service</Link>
            <Link>Legal</Link>
            <Link>Privacy Policy</Link>
            <Link>Status</Link>
          </Stack>
          <Stack align={"flex-start"}>
            <ListHeader>Follow Us</ListHeader>
            <Link>Facebook</Link>
            <Link>Twitter</Link>
            <Link>Dribbble</Link>
            <Link>Instagram</Link>
            <Link>LinkedIn</Link>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
