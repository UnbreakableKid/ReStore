import { Container, useColorModeValue, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { BasketItem } from "../../app/models/basket";
import { Order } from "../../app/models/order";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface OrderSelectedProps {
  order: Order;
  setSelectedOrder: (id: number) => void;
}

const OrderSelected: React.FC<OrderSelectedProps> = ({
  order,
  setSelectedOrder,
}) => {
  const subTotal = order.orderItems.reduce(
    (acc, curr) => acc + curr.quantity * curr.price,
    0
  );
  return (
    <Container
      maxW={"container.xl"} // eslint-disable-next-line react-hooks/rules-of-hooks
      bg={useColorModeValue("gray.50", "gray.900")}
      rounded={"md"}
      p={4}
      mt={3}
    >
      <BasketTable items={order.orderItems as unknown as BasketItem[]} isBakset={false} />
      <BasketSummary subtotal={subTotal} />
    </Container>
  );
};

export default OrderSelected;
