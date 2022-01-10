import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  Stack,
  Checkbox,
} from "@chakra-ui/react";
import React from "react";

interface ContentsProps {}

const ReviewOrder: React.FC<ContentsProps> = ({}) => {
  return (
    <Box rounded={"lg"} p={8} w={"fit-content"}>
      <Stack spacing={4}>
        <HStack>
          <Box>
            <FormControl id="firstName" isRequired>
              <FormLabel>First Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="lastName">
              <FormLabel>Last Name</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
        </HStack>
        <FormControl id="address1" isRequired>
          <FormLabel>AddressLine1</FormLabel>
          <InputGroup>
            <Input />
          </InputGroup>
        </FormControl>
        <FormControl id="address2" isRequired>
          <FormLabel>AddressLine2</FormLabel>
          <InputGroup>
            <Input />
          </InputGroup>
        </FormControl>
        <HStack>
          <Box>
            <FormControl id="city">
              <FormLabel>City</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="state">
              <FormLabel>State</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
        </HStack>
        <HStack>
          <Box>
            <FormControl id="zip">
              <FormLabel>Zip / Postal</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
          <Box>
            <FormControl id="country" isRequired>
              <FormLabel>Country</FormLabel>
              <Input type="text" />
            </FormControl>
          </Box>
        </HStack>
        <Checkbox name="saveAddress" value="yes" label="Store this address">
          Use address for shipping?
        </Checkbox>
      </Stack>
    </Box>
  );
};

export default ReviewOrder;
