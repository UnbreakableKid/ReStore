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
import { useAppSelector } from "../../app/store/configureStore";

interface Props {
  subtotal?: number;
}

export default function BasketSummary({ subtotal }: Props) {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket) return <Heading as="h3">No basket</Heading>;

  if (subtotal === undefined)
    subtotal = basket.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
  const deliveryFee = subtotal > 100 ? 0 : 10;

  const totalPrice = subtotal + deliveryFee;

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
              <Td isNumeric>{subtotal}$</Td>
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
