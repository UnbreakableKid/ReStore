import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  AvatarBadge,
  Button,
  useColorMode,
  Center,
} from "@chakra-ui/react";
import {
  HamburgerIcon,
  CloseIcon,
  StarIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { AiOutlineShoppingCart } from "react-icons/ai";

const Links = ["Home", "Catalog", "About", "Contact"];

const NavLink = ({ children }: { children: string }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={children === "Home" ? "/" : children.toLowerCase()}
  >
    {children}
  </Link>
);

export default function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack
            spacing={"45em"}
            alignItems={"center"}
            justifyContent={"stretch"}
          >
            <Box>Insert Logo</Box>
            <Center>
              <HStack
                as={"nav"}
                spacing={4}
                display={{ base: "none", md: "flex" }}
              >
                {Links.map((link) => (
                  <NavLink key={link}>{link}</NavLink>
                ))}
              </HStack>
            </Center>
          </HStack>
          <Flex alignItems={"center"}>
            <Button onClick={toggleColorMode} zIndex={2}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Avatar
              bg={useColorModeValue("white.100", "gray.900")}
              icon={
                <AiOutlineShoppingCart
                  style={{ color: useColorModeValue("black", "white") }}
                />
              }
              showBorder={false}
              size={"md"}
            >
              <AvatarBadge
                boxSize="1.25em"
                border={"hidden"}
                style={{ color: useColorModeValue("black", "white") }}
              >
                5
              </AvatarBadge>
            </Avatar>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}
