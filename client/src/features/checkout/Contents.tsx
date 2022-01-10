import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Stack,
  Container,
  Checkbox,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import AppTextInput from "../../app/components/AppTextInput";

interface ContentsProps {}

const ShippingAddress: React.FC<ContentsProps> = ({}) => {
  const { control, handleSubmit } = useForm();
  return (
    <Box
      rounded={"lg"}
      p={8}
      w={"fit-content"}
      as="form"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <Stack spacing={4}>
        <AppTextInput
          control={control}
          name="fullName"
          label="Full Name"
          isRequired
        />
        <AppTextInput
          control={control}
          name="address1"
          label="Address Line 1"
          isRequired
        />
        <AppTextInput
          control={control}
          name="address2"
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
              name="zip"
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
        <Checkbox name="saveAddress" value="yes" label="Store this address">
          Use address for shipping?
        </Checkbox>
        <Button type="submit">Submit</Button>
      </Stack>
    </Box>
  );
};

export default ShippingAddress;
