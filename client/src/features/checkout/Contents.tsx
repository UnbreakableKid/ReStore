import { Box, HStack, Stack } from "@chakra-ui/react";
import React from "react";
import { useFormContext } from "react-hook-form";
import AppCheckbox from "../../app/components/AppCheckbox";
import AppTextInput from "../../app/components/AppTextInput";

interface ContentsProps {}

const ShippingAddress: React.FC<ContentsProps> = () => {
  const { control, formState } = useFormContext();
  return (
    <Box rounded={"lg"} p={8} w={"fit-content"}>
      <Stack spacing={4}>
        <AppTextInput
          control={control}
          name="fullName"
          label="Full Name"
          isRequired
        />
        <AppTextInput
          control={control}
          name="addressLine1"
          label="Address Line 1"
          isRequired
        />
        <AppTextInput
          control={control}
          name="addressLine2"
          label="Address Line 2"
          isRequired
        />
        <HStack>
          <Box>
            <AppTextInput
              control={control}
              name="city"
              label="City"
              isRequired
            />
          </Box>
          <Box>
            <AppTextInput
              control={control}
              name="state"
              label="State"
              isRequired
            />
          </Box>
        </HStack>
        <HStack>
          <Box>
            <AppTextInput
              control={control}
              name="zipCode"
              label="Zip / Postal"
              isRequired
            />
          </Box>
          <Box>
            <AppTextInput
              control={control}
              name="country"
              label="Country"
              isRequired
            />
          </Box>
        </HStack>
        <AppCheckbox
          label="Save this as the default address"
          name="saveAddress"
          control={control}
          disabled={!formState.isDirty}
        />
      </Stack>
    </Box>
  );
};

export default ShippingAddress;
