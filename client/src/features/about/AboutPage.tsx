import {
  Alert,
  AlertIcon,
  AlertTitle,
  Button,
  ButtonGroup,
  Center,
  CloseButton,
  Heading,
  List,
  ListItem,
} from "@chakra-ui/react";
import { useState } from "react";
import agent from "../../api/agent";

export default function AboutPage() {
  const [validationErrors, setvalidationErrors] = useState<string[]>([]);

  function getValidationError() {
    agent.TestErrors.getValidationError()
      .then((response) => console.log(response))
      .catch((error) => setvalidationErrors(error));
  }

  return (
    <>
      <Heading as="h2">Error Testing</Heading>
      <Center>
        <ButtonGroup>
          <Button
            colorScheme="blue"
            onClick={() =>
              agent.TestErrors.get400Error().catch((error) => {
                console.log(error);
              })
            }
          >
            Test 400
          </Button>
          <Button
            colorScheme="blue"
            onClick={() =>
              agent.TestErrors.get401Error().catch((error) => {
                console.log(error);
              })
            }
          >
            Test 401
          </Button>
          <Button
            colorScheme="blue"
            onClick={() =>
              agent.TestErrors.get404Error().catch((error) => {
                console.log(error);
              })
            }
          >
            Test 404
          </Button>
          <Button
            colorScheme="blue"
            onClick={() =>
              agent.TestErrors.get500Error().catch((error) => {
                console.log(error);
              })
            }
          >
            Test 500
          </Button>
          <Button colorScheme="blue" onClick={getValidationError}>
            Test Validation
          </Button>
        </ButtonGroup>
      </Center>
      {validationErrors.length > 0 && (
        <Alert status="error">
          <AlertIcon />

          <AlertTitle>Validation Errors</AlertTitle>
          <List>
            {validationErrors.map((error) => (
              <ListItem key={error}>{error}</ListItem>
            ))}
          </List>
          <CloseButton position="absolute" right="8px" top="8px" />
        </Alert>
      )}
    </>
  );
}
