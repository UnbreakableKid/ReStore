import { MinusIcon, PlusSquareIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Flex,
  Avatar,
  Box,
  IconButton,
} from "@chakra-ui/react";
import React from "react";
import { BasketItem } from "../../app/models/basket";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { removeBaskeItemAsync, addBasketItemAsync } from "./basketSlice";

interface BasketTableProps {
  items: BasketItem[];
  isBakset?: boolean;
}

const BasketTable: React.FC<BasketTableProps> = ({
  items,
  isBakset = true,
}) => {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  return (
    <Table variant="simple" colorScheme={"telegram"}>
      <TableCaption>Your basket</TableCaption>
      <Thead>
        <Tr>
          <Th>Product</Th>
          <Th isNumeric>Price</Th>
          <Th isNumeric>Quantity</Th>
          <Th isNumeric>SubTotal</Th>
          {isBakset && <Th />}
        </Tr>
      </Thead>
      <Tbody>
        {items.map((item) => (
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
                {isBakset && (
                  <IconButton
                    aria-label="Remove item"
                    icon={<MinusIcon color={"red.500"} />}
                    variant="ghost"
                    isLoading={
                      status === `pendingRemoveItem${item.productId}rem`
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
                )}
                {item.quantity}
                {isBakset && (
                  <IconButton
                    aria-label="Add item"
                    icon={<PlusSquareIcon color={"red.500"} />}
                    variant="ghost"
                    isLoading={status === `pendingAddItem${item.productId}`}
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                        })
                      )
                    }
                  />
                )}
              </Box>
            </Td>
            <Td isNumeric>{item.price * item.quantity} $</Td>
            {isBakset && (
              <Td>
                <IconButton
                  aria-label="Delete item"
                  icon={<DeleteIcon color={"red.500"} />}
                  variant="ghost"
                  isLoading={
                    status === `pendingRemoveItem${item.productId}delete`
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
            )}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default BasketTable;
