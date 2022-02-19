import {
  Container,
  Heading,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/configureStore";
import BasketSummary from "./BasketSummary";
import BasketTable from "./BasketTable";

export default function BasketPage() {
  const { basket } = useAppSelector((state) => state.basket);

  if (!basket) return <Heading as="h3">No basket</Heading>;

  return (
    <Container
      maxW={"container.xl"} // eslint-disable-next-line react-hooks/rules-of-hooks
      bg={useColorModeValue("gray.50", "gray.900")}
      rounded={"md"}
      p={4}
      mt={3}
    >
      <BasketTable items={basket.items} />
      <BasketSummary />
      <Button as={Link} to={"/checkout"} w={"full"}>
        Checkout
      </Button>
    </Container>
  );
}
