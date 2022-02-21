import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import agent from "../../api/agent";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { Order } from "../../app/models/order";
import OrderSelected from "./OrderSelected";

interface OrderProps {}

const OrderPage: React.FC<OrderProps> = ({}) => {
  const [orders, setOrders] = useState<Order[] | null>([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(0);

  useEffect(() => {
    setLoading(true);
    agent.Orders.list()
      .then((res) => {
        setOrders(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingComponent message="Loading Orders..." />;

  if (selectedOrder > 0) {
    return (
      <OrderSelected
        order={orders?.find((o) => o.id === selectedOrder)!}
        setSelectedOrder={setSelectedOrder}
      />
    );
  }

  return (
    <Table variant="simple">
      <TableCaption>Your Orders</TableCaption>
      <Thead>
        <Tr>
          <Th isNumeric>Order Number</Th>
          <Th isNumeric>Total</Th>
          <Th isNumeric>Order Date</Th>
          <Th isNumeric>Order Status</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {orders?.map((order) => (
          <Tr key={order.id}>
            <Th isNumeric>{order.id}</Th>
            <Td isNumeric>{`$${order.total}`}</Td>
            <Td isNumeric>{order.orderDate.split("T")[0]}</Td>
            <Td isNumeric>{order.orderStatus}</Td>
            <Td>
              <Button onClick={() => setSelectedOrder(order.id)}>View</Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default OrderPage;
