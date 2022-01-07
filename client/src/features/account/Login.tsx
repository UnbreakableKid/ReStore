/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Box,
  FormControl,
  Checkbox,
  Stack,
  Heading,
  Text,
  Link as CLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import * as Yup from "yup";

import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";

import YupPassword from "yup-password";
import agent from "../../api/agent";
YupPassword(Yup);

export default function Login() {
  const onSubmit = (values: any) => {
    agent.Account.login(values);
  };

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().password().required("Required"),
  });
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Flex
          minH={""}
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          as="form"
          //wtf?
          onSubmit={handleSubmit as any}
        >
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"}>Sign in to your account</Heading>
              {/* <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool <Link color={"blue.400"}>features</Link> ✌️
          </Text> */}
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="username">
                  <InputControl label="Username" name="username" />
                </FormControl>
                <FormControl id="password">
                  <InputControl
                    label="password"
                    name="password"
                    inputProps={{ type: "password" }}
                  />
                </FormControl>
                <Stack spacing={10}>
                  <Stack
                    direction={{ base: "column", sm: "row" }}
                    align={"start"}
                    justify={"space-between"}
                  >
                    <Checkbox>Remember me</Checkbox>
                  </Stack>
                  <Stack>
                    <SubmitButton
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      Sign in
                    </SubmitButton>
                    <Text>
                      Don't have an account?{" "}
                      <CLink as={Link} color="teal.500" to={"/register"}>
                        Sign Up!
                      </CLink>
                    </Text>
                  </Stack>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
}
