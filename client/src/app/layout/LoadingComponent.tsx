import { Center, Container, Heading, Spinner, Stack } from "@chakra-ui/react";

interface Props {
  message: string;
}

export default function LoadingComponent({ message = "Loading..." }: Props) {
  return (
    <Container h={"-webkit-fit-content"} pt={"10em"}>
      <Center>
        <Stack justifyContent={"center"} align={"center"}>
          <Heading as="h1">{message}</Heading>
          <Spinner size={"xl"} color="red" />
        </Stack>
      </Center>
    </Container>
  );
}
