import {
  Box,
  Stack,
  HStack,
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";
import {
  CardCvcElement,
  CardElement,
  CardExpiryElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";

import React from "react";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/AppCheckbox";
import AppTextInput from "../../app/components/AppTextInput";

interface PaymentDetailsProps {}

const PaymentDetails: React.FC<PaymentDetailsProps> = () => {
  const { control } = useFormContext();

  return (
    <Box rounded={"lg"} p={8} w={"max-content"}>
      <Stack spacing={4}>
        <HStack>
          <AppTextInput
            control={control}
            name="cardName"
            label="Name on Card"
            isRequired
          />
          <FormControl>
            <FormLabel>Card Number</FormLabel>
            <Input
              id="cardNumber"
              as={CardNumberElement}
              variant="filled"
              justifyItems={"center"}
              textColor="white"
              minW={"xs"}
            />
          </FormControl>
        </HStack>
        <HStack>
          <FormControl>
            <FormLabel>Expire Date</FormLabel>
            <Input
              id="expDate"
              as={CardExpiryElement}
              variant="filled"
              justifyItems={"center"}
              textColor="white"
            />
          </FormControl>
          <FormControl>
            <FormLabel>CVV</FormLabel>
            <Input
              id="cvv"
              as={CardCvcElement}
              variant="filled"
              justifyItems={"center"}
              textColor="white"
            />
          </FormControl>{" "}
        </HStack>
      </Stack>
    </Box>
  );
};

export default PaymentDetails;
