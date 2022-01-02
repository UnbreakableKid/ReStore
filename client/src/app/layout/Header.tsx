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
  Stack,
  Spacer,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
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

const LinksUser = ["Login", "Register"];

const NavLink = ({ children }: { children: string }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={children === "Home" ? "/" : "/" + children.toLowerCase()}
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
        <HStack h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>Insert Logo</Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
              {LinksUser.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
              <Menu placement="bottom">
                <MenuButton>
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
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link to="/profile">Profile</Link>
                  </MenuItem>
                  <MenuItem onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"} Theme
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </>
  );
}
