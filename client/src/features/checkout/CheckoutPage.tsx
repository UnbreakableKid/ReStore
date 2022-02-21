import {
  Flex,
  Center,
  Heading,
  Button,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FieldValues, FormProvider, useForm } from "react-hook-form";
import {
  FiCheckCircle,
  FiClipboard,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";
import ShippingAddress from "./Contents";
import PaymentDetails from "./PaymentDetails";
import ReviewOrder from "./ReviewOrder";

import { yupResolver } from "@hookform/resolvers/yup";
import { checkoutValidationSchema } from "./checkoutValidation";
import { useEffect, useState } from "react";
import agent from "../../api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { clearBasket } from "../basket/basketSlice";

const steps = [
  { label: "Shipping Address", icon: FiUser },
  { label: "Review Order", icon: FiClipboard },
  { label: "Pay", icon: FiDollarSign },
];

export default function CheckoutPage() {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const dispatch = useAppDispatch();

  const [orderNumber, setOrderNumber] = useState(0);
  const [loading, setLoading] = useState(false);

  const submit = async (data: FieldValues) => {
    const { cardName, saveAddress, ...shippingAddress } = data;
    if (activeStep === steps.length - 1) {
      setLoading(true);
      console.log(saveAddress);
      console.log(shippingAddress);
      try {
        const orderNumber = await agent.Orders.create({
          saveAddress,
          shippingAddress,
        });
        setOrderNumber(orderNumber);
        nextStep();
        dispatch(clearBasket());
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    } else nextStep();
  };

  const currentValidationSchema = checkoutValidationSchema[activeStep];

  const methods = useForm({
    mode: "all",
    resolver: yupResolver(currentValidationSchema),
  });

  useEffect(() => {
    agent.Account.fetchAddress().then((address) => {
      if (address) {
        methods.reset({
          ...methods.getValues(),
          ...address,
          saveAddress: false,
        });
      }
    });
  }, [methods]);

  const pages = (index: number) => {
    switch (index) {
      case 0:
        return <ShippingAddress />;
      case 1:
        return <ReviewOrder />;
      case 2:
        return <PaymentDetails />;
    }
  };
  return (
    <FormProvider {...methods}>
      <Center>
        <Flex
          flexDir="column"
          width="80%"
          justify={"center"}
          mt={5}
          p={5}
          rounded={"md"}
          bg={useColorModeValue("gray.50", "gray.900")}
        >
          <Steps checkIcon={FiCheckCircle} activeStep={activeStep}>
            {steps.map(({ label, icon }, index) => (
              <Step label={label} key={label} icon={icon} mb={10}>
                <Container as="form" onSubmit={methods.handleSubmit(submit)}>
                  {pages(index)}
                  <Flex width="100%" justify="flex-end">
                    <Button
                      mr={4}
                      size="sm"
                      variant="ghost"
                      onClick={prevStep}
                      isDisabled={activeStep === 0}
                    >
                      Prev
                    </Button>
                    <Button
                      size="sm"
                      type="submit"
                      disabled={!methods.formState.isValid}
                      isLoading={loading}
                    >
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Flex>
                </Container>
              </Step>
            ))}
          </Steps>
          {activeStep === 3 && (
            <Center p={4} flexDir="column">
              <Heading fontSize="xl">
                Woohoo! All steps completed! Your orderNumber is {orderNumber}
              </Heading>
              <Button mt={6} size="sm" onClick={reset}>
                Reset
              </Button>
            </Center>
          )}
        </Flex>
      </Center>
    </FormProvider>
  );
}
