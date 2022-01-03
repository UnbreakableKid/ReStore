import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  HStack,
  NumberInput,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputField,
  NumberInputStepper,
} from "@chakra-ui/react";
import { MdLocalShipping } from "react-icons/md";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import NotFound from "../../app/errors/NotFound";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import {
  addBasketItemAsync,
  removeBaskeItemAsync,
} from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
  const { basket, status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  const { id } = useParams<{ id: string }>();

  const product = useAppSelector((state) =>
    productSelectors.selectById(state, id)
  );

  const { status: productStatus } = useAppSelector((state) => state.catalog);

  const [quantity, setQuantity] = useState(0);

  const item = basket?.items.find((i) => i.productId === product?.id);

  const boldYellow = useColorModeValue("yellow.500", "yellow.300");

  const buttonColors = {
    bg: useColorModeValue("gray.900", "gray.50"),
    color: useColorModeValue("white", "gray.900"),
  };

  const textColor = useColorModeValue("gray.500", "gray.400");

  const dividerColor = useColorModeValue("gray.200", "gray.600");

  useEffect(() => {
    if (item) setQuantity(item.quantity);
    if (!product) dispatch(fetchProductAsync(parseInt(id)));
  }, [id, item, dispatch, product]);

  function handleUpdateCart() {
    if (!item || quantity > item.quantity) {
      const updatedQuantity = item ? quantity - item.quantity : quantity;
      dispatch(
        addBasketItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    } else {
      const updatedQuantity = item.quantity - quantity;
      dispatch(
        removeBaskeItemAsync({
          productId: product?.id!,
          quantity: updatedQuantity,
        })
      );
    }
  }

  if (productStatus.includes("pending"))
    return <LoadingComponent message="Loading Product..." />;

  if (!product) return <NotFound />;

  return (
    <Container maxW={"7xl"}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 18, md: 24 }}
      >
        <Flex>
          <Image
            rounded={"md"}
            alt={"product image"}
            src={product.pictureURL}
            fit={"contain"}
            align={"center"}
            w={"100%"}
            h={{ base: "100%", sm: "400px", lg: "500px" }}
          />
        </Flex>
        <Stack spacing={{ base: 6, md: 10 }}>
          <Box as={"header"}>
            <Heading
              lineHeight={1.1}
              fontWeight={600}
              fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
            >
              {product.name}
            </Heading>
            <Text color={"red"} fontWeight={400} fontSize={"2xl"}>
              {product.price}$
            </Text>
          </Box>

          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={"column"}
            divider={<StackDivider borderColor={dividerColor} />}
          >
            <VStack spacing={{ base: 4, sm: 6 }}>
              <Text color={textColor} fontSize={"2xl"} fontWeight={"300"}>
                Description
              </Text>
              <Text fontSize={"lg"}>{product.description}</Text>
            </VStack>
            <HStack alignItems={"center"}>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={boldYellow}
                fontWeight={"500"}
                textTransform={"uppercase"}
              >
                Type
              </Text>

              <Text fontSize={"lg"}>{product.type}</Text>
            </HStack>
            <HStack>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={boldYellow}
                fontWeight={"500"}
                textTransform={"uppercase"}
              >
                Brand
              </Text>

              <Text fontSize={"lg"}>{product.brand}</Text>
            </HStack>
            <HStack>
              <Text
                fontSize={{ base: "16px", lg: "18px" }}
                color={boldYellow}
                fontWeight={"500"}
                textTransform={"uppercase"}
              >
                Quantity in stock
              </Text>

              <Text fontSize={"lg"}>{product.quantityInStock}</Text>
            </HStack>
          </Stack>
          <HStack>
            <NumberInput
              allowMouseWheel
              min={0}
              defaultValue={item && item.quantity > 0 ? item.quantity : 1}
              onChange={(value) => setQuantity(Number.parseInt(value))}
            >
              <NumberInputField placeholder="Quantity" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
            <Button
              rounded={"none"}
              w={"full"}
              mt={8}
              size={"lg"}
              py={"7"}
              bg={buttonColors.bg}
              color={buttonColors.color}
              textTransform={"uppercase"}
              _hover={{
                transform: "translateY(2px)",
                boxShadow: "lg",
              }}
              isLoading={status.includes("pending")}
              onClick={handleUpdateCart}
            >
              {item ? "Update cart" : "Add to cart"}
            </Button>
          </HStack>
          <Stack direction="row" alignItems="center" justifyContent={"center"}>
            <MdLocalShipping />
            <Text>2-3 business days delivery</Text>
          </Stack>
        </Stack>
      </SimpleGrid>
    </Container>
  );
}
