import { Center, Container, useColorModeValue } from "@chakra-ui/react";
import React from "react";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "../basket/BasketSummary";
import BasketTable from "../basket/BasketTable";

interface ContentsProps {}

const ReviewOrder: React.FC<ContentsProps> = () => {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <Center>
      <Container
        bg={useColorModeValue("gray.50", "gray.900")}
        rounded={"md"}
        p={4}
        mt={3}
        maxW={"container.xl"}
        minW={"max"}
      >
        {basket && <BasketTable items={basket.items} isBakset={false} />}
        <BasketSummary />
      </Container>
    </Center>
  );
};

export default ReviewOrder;
