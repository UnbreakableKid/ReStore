import {
  Flex,
  Center,
  Heading,
  Button,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FormProvider, useForm } from "react-hook-form";
import {
  FiCheckCircle,
  FiClipboard,
  FiDollarSign,
  FiUser,
} from "react-icons/fi";
import ShippingAddress from "./Contents";
import PaymentDetails from "./PaymentDetails";
import ReviewOrder from "./ReviewOrder";

const steps = [
  { label: "Shipping Address", icon: FiUser },
  { label: "Review Order", icon: FiClipboard },
  { label: "Pay", icon: FiDollarSign },
];

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

export default function CheckoutPage() {
  const { nextStep, prevStep, reset, activeStep } = useSteps({
    initialStep: 0,
  });

  const submit = (data: any) => {
    if (activeStep === 0) {
      console.log(data);
    }
    nextStep();
  };

  const methods = useForm();
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
                    <Button size="sm" type="submit">
                      {activeStep === steps.length - 1 ? "Finish" : "Next"}
                    </Button>
                  </Flex>
                </Container>
              </Step>
            ))}
          </Steps>
          {activeStep === 3 && (
            <Center p={4} flexDir="column">
              <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
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
