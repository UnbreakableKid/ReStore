import { Button, Container, Divider, Heading } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";

export default function NotFound() {
  const history = useHistory();

  return (
    <>
      <Container h={400}>
        <Heading as="h3">OOPS nothing was found</Heading>
        <Divider />
        <Button onClick={() => history.push("/catalog")}>Go back</Button>
      </Container>
    </>
  );
}
