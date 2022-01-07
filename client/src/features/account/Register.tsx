/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  Box,
  FormControl,
  Stack,
  Heading,
  Text,
  Link as CLink,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";

import { Formik } from "formik";
import { InputControl, SubmitButton } from "formik-chakra-ui";
import YupPassword from "yup-password";
import { FieldValues } from "react-hook-form";
import agent from "../../api/agent";

YupPassword(Yup);

export default function Register() {
  const history = useHistory();

  const onSubmit = async (values: FieldValues) => {
    console.log(values);
    agent.Account.register(values);
    history.push("/login");
  };

  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required"),
    password: Yup.string().password().required("Required"),
    email: Yup.string().email().required("Required"),
  });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, values, errors }) => (
        <Flex
          align={"center"}
          justify={"center"}
          bg={useColorModeValue("gray.50", "gray.800")}
          as="form"
          //wtf?
          onSubmit={handleSubmit as any}
        >
          <Stack spacing={8} mx={"auto"} minW={"lg"} py={12} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"}>
                Sign up
              </Heading>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <FormControl id="username">
                  <InputControl name="username" isRequired label="Username" />
                </FormControl>

                <FormControl id="email">
                  <InputControl name="email" isRequired label="Email" />
                </FormControl>
                <FormControl id="password">
                  <InputControl
                    name="password"
                    isRequired
                    label="Password"
                    inputProps={{ type: "password" }}
                  />
                </FormControl>
                <Stack spacing={10} pt={2}>
                  <SubmitButton
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                  >
                    Sign up
                  </SubmitButton>
                </Stack>
                <Stack pt={6}>
                  <Text>
                    Don't have an account?{" "}
                    <CLink as={Link} color="teal.500" to={"/register"}>
                      Sign Up!
                    </CLink>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      )}
    </Formik>
  );
}
