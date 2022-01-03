import {
  Heading,
  Container,
  Table,
  TableCaption,
  Tr,
  Tbody,
  Td,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useStoreContext } from "../../app/context/StoreContext";

export default function BasketSummary() {
  const { basket } = useStoreContext();

  if (!basket) return <Heading as="h3">No basket</Heading>;

  const subTotal = basket.items.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  const deliveryFee = subTotal > 100 ? 0 : 10;

  const totalPrice = subTotal + deliveryFee;

  return (
    <Flex alignItems={"end"}>
      <Spacer />
      <Container maxW={"container.sm"} rounded={"md"}>
        <Table variant="simple">
          <TableCaption>Final Costs</TableCaption>

          <Tbody>
            <Tr>
              <Td>
                <Text>Subtotal</Text>
              </Td>
              <Td isNumeric>{subTotal}$</Td>
            </Tr>
            <Tr>
              <Td>
                <Text>Delivery fee*</Text>
              </Td>

              <Td isNumeric>{deliveryFee}$</Td>
            </Tr>
            <Tr>
              <Td>
                <Text>Total</Text>
              </Td>

              <Td isNumeric>{totalPrice}$</Td>
            </Tr>
          </Tbody>
        </Table>
      </Container>
    </Flex>
  );
}
