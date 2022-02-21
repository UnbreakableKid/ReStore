import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link as ChakraLink,
  useColorModeValue,
  AvatarBadge,
  useColorMode,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Image,
} from "@chakra-ui/react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { Link } from "react-router-dom";
import { signOut } from "../../features/account/accountSlice";
import { clearBasket } from "../../features/basket/basketSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

const Links = ["Home", "Catalog", "About", "Contact"];

const LinksUser = ["Login", "Register"];

const NavLink = ({ children }: { children: string }) => (
  <ChakraLink
    as={Link}
    px={2}
    py={1}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    to={children === "Home" ? "/" : "/" + children.toLowerCase()}
  >
    {children}
  </ChakraLink>
);

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();

  const { basket } = useAppSelector((state) => state.basket);

  const { user } = useAppSelector((state) => state.account);

  const dispatch = useAppDispatch();

  const itemCount = basket?.items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <HStack h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Image src={useColorModeValue("/logo.png", "/logo-light.png")} />
          </Box>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link}>{link}</NavLink>
            ))}
          </HStack>
          <Flex alignItems={"center"}>
            <HStack as={"nav"} display={{ base: "none", md: "flex" }}>
              {!user &&
                LinksUser.map((link) => <NavLink key={link}>{link}</NavLink>)}

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
                      {itemCount}
                    </AvatarBadge>
                  </Avatar>
                </MenuButton>
                <MenuList>
                  <MenuItem as={Link} to="/basket">
                    Basket
                  </MenuItem>
                  <MenuItem as={Link} to="/orders">
                    My Orders
                  </MenuItem>
                  <MenuItem onClick={toggleColorMode}>
                    Toggle {colorMode === "light" ? "Dark" : "Light"} Theme
                  </MenuItem>
                  {user && (
                    <MenuItem
                      onClick={() => {
                        dispatch(signOut());
                        dispatch(clearBasket());
                      }}
                    >
                      Sign Out
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </HStack>
      </Box>
    </>
  );
}
