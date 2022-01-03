import { DeleteIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Container,
  Flex,
  Heading,
  HStack,
  IconButton,
  Spacer,
  Table,
  TableCaption,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Basket } from "../../app/models/basket";

export default function BasketPage() {
  const [loading, setLoading] = useState(true);
  const [basket, setBasket] = useState<Basket | null>(null);

  useEffect(() => {
    agent.Basket.get()
      .then((basket) => setBasket(basket))
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading basket..." />;

  if (!basket) return <Heading as="h3">No basket</Heading>;

  return (
    <Container maxW={"container.xl"}>
      <Table variant="simple">
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
              <Td isNumeric>{item.quantity}</Td>
              <Td isNumeric>{item.price * item.quantity} $</Td>
              <Td>
                <IconButton
                  aria-label="Delete"
                  icon={<DeleteIcon color={"red.500"} />}
                  variant="ghost"
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
}
