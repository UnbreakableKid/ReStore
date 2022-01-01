/* eslint-disable react-hooks/rules-of-hooks */
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useHistory, useLocation } from "react-router-dom";

export default function ServerError() {
  const history = useHistory();
  const { state } = useLocation<any>();
  return (
    <Container
      maxW="container.xl"
      bg={"white"}
      textColor={useColorModeValue("gray.900", "black")}
    >
      {state?.error ? (
        <>
          <Heading color="red" as="h1">
            {state.error.title}
          </Heading>
          <Divider />
          <Text>{state?.error.detail || "internal error"}</Text>
        </>
      ) : (
        <Text>Server Error</Text>
      )}
      <Button colorScheme={"whatsapp"} onClick={() => history.push("/catalog")}>
        {" "}
        Go back
      </Button>
    </Container>
  );
}
