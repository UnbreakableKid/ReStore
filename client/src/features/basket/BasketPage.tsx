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
} from "@chakra-ui/react";
import { useState } from "react";
import agent from "../../api/agent";
import { useStoreContext } from "../../app/context/StoreContext";
import BasketSummary from "./BasketSummary";

export default function BasketPage() {
  const { basket, setBasket, removeItem } = useStoreContext();
  const [status, setStatus] = useState({
    loading: false,
    name: "",
  });

  function handleAddItem(productId: number, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.addItem(productId)
      .then((basket) => setBasket(basket))
      .catch((error) => console.log("error", error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

  function handleRemoveItem(productId: number, quantity = 1, name: string) {
    setStatus({ loading: true, name });
    agent.Basket.removeItem(productId, quantity)
      .then(() => removeItem(productId, quantity))
      .catch((error) => console.log("error", error))
      .finally(() => setStatus({ loading: false, name: "" }));
  }

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
                      aria-label="Delete"
                      icon={<PlusSquareIcon color={"red.500"} />}
                      variant="ghost"
                      isLoading={
                        status.loading &&
                        status.name === "add " + item.productId
                      }
                      onClick={() =>
                        handleAddItem(item.productId, "add " + item.productId)
                      }
                    />
                    {item.quantity}
                    <IconButton
                      aria-label="Delete"
                      icon={<MinusIcon color={"red.500"} />}
                      variant="ghost"
                      isLoading={
                        status.loading &&
                        status.name === "rem " + item.productId
                      }
                      onClick={() =>
                        handleRemoveItem(
                          item.productId,
                          1,
                          "rem " + item.productId
                        )
                      }
                    />
                  </Box>
                </Td>
                <Td isNumeric>{item.price * item.quantity} $</Td>
                <Td>
                  <IconButton
                    aria-label="Delete"
                    icon={<DeleteIcon color={"red.500"} />}
                    variant="ghost"
                    isLoading={
                      status.loading && status.name === "del" + item.productId
                    }
                    onClick={() =>
                      handleRemoveItem(
                        item.productId,
                        item.quantity,
                        "del" + item.productId
                      )
                    }
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <BasketSummary />
      </Container>
    </>
  );
}
