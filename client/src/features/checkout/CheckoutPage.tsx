import {
  Flex,
  Center,
  Heading,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import { Step, Steps, useSteps } from "chakra-ui-steps";
import { FiCheckCircle } from "react-icons/fi";
import ShippingAddress from "./Contents";
import PaymentDetails from "./PaymentDetails";
import ReviewOrder from "./ReviewOrder";

const steps = [
  { label: "Step 1", description: "Step 1 description" },
  { label: "Step 2", description: "Step 2 description" },
  { label: "Step 3", description: "Step 3 description" },
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
  return (
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
          {steps.map(({ label }, index) => (
            <Step label={label} key={label} mb={10}>
              {pages(index)}
            </Step>
          ))}
        </Steps>
        {activeStep === 3 ? (
          <Center p={4} flexDir="column">
            <Heading fontSize="xl">Woohoo! All steps completed!</Heading>
            <Button mt={6} size="sm" onClick={reset}>
              Reset
            </Button>
          </Center>
        ) : (
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
            <Button size="sm" onClick={nextStep}>
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </Flex>
        )}
      </Flex>
    </Center>
  );
}
