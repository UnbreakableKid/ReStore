import { DeleteIcon, MinusIcon, PlusSquareIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  useColorModeValue,
  Td,
  Th,
  Thead,
  Tr,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBaskeItemAsync } from "./basketSlice";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  if (!basket) return <Heading as="h3">No basket</Heading>;

  return (
    <>
      <Container
        maxW={"container.xl"} // eslint-disable-next-line react-hooks/rules-of-hooks
        bg={useColorModeValue("gray.50", "gray.900")}
        rounded={"md"}
        p={4}
        mt={3}
      >
        <Table variant="simple" colorScheme={"telegram"}>
          <TableCaption>Your basket</TableCaption>
          <Thead>
            <Tr>
              <Th>Product</Th>
              <Th isNumeric>Price</Th>
              <Th isNumeric>Quantity</Th>
              <Th isNumeric>SubTotal</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {basket.items.map((item) => (
              <Tr key={item.productId}>
                <Td>
                  <Flex align={"center"}>
                    <Avatar rounded={"xl"} src={item.pictureUrl} mr={"10px"} />
                    {item.productName}
                  </Flex>
                </Td>
                <Td isNumeric>{item.price} $</Td>
                <Td isNumeric>
                  <Box>
                    <IconButton
                      aria-label="Add item"
                      icon={<PlusSquareIcon color={"red.500"} />}
                      variant="ghost"
                      isLoading={status === "pendingAddItem" + item.productId}
                      onClick={() =>
                        dispatch(
                          addBasketItemAsync({
                            productId: item.productId,
                            quantity: 1,
                          })
                        )
                      }
                    />
                    {item.quantity}
                    <IconButton
                      aria-label="Remove item"
                      icon={<MinusIcon color={"red.500"} />}
                      variant="ghost"
                      isLoading={
                        status === "pendingRemoveItem" + item.productId + "rem"
                      }
                      onClick={() =>
                        dispatch(
                          removeBaskeItemAsync({
                            productId: item.productId,
                            quantity: 1,
                            name: "rem",
                          })
                        )
                      }
                    />
                  </Box>
                </Td>
                <Td isNumeric>{item.price * item.quantity} $</Td>
                <Td>
                  <IconButton
                    aria-label="Delete item"
                    icon={<DeleteIcon color={"red.500"} />}
                    variant="ghost"
                    isLoading={
                      status === "pendingRemoveItem" + item.productId + "delete"
                    }
                    onClick={() =>
                      dispatch(
                        removeBaskeItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          name: "delete",
                        })
                      )
                    }
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <BasketSummary />
        <Button as={Link} to={"/checkout"} w={"full"}>
          Checkout
        </Button>
      </Container>
    </>
  );
}
