import { Box, Stack, HStack } from "@chakra-ui/react";

import React from "react";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/AppCheckbox";
import AppTextInput from "../../app/components/AppTextInput";

interface PaymentDetailsProps {}

const PaymentDetails: React.FC<PaymentDetailsProps> = () => {
  const { control } = useFormContext();

  return (
    <Box rounded={"lg"} p={8} w={"fit-content"}>
      <Stack spacing={4}>
        <HStack>
          <AppTextInput
            control={control}
            name="cardName"
            label="Name on Card"
            isRequired
          />
          <AppTextInput
            control={control}
            name="cardNumber"
            label="Card Number"
          />
        </HStack>
        <HStack>
          <AppTextInput
            control={control}
            name="expiryDate"
            label="Expiry Date"
          />
          <AppTextInput control={control} name="cvv" label="CVV" />
        </HStack>
        <AppCheckbox control={control} name="saveCard" label="Save Card" />
      </Stack>
    </Box>
  );
};

export default PaymentDetails;
