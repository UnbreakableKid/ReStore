import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  Tooltip,
  GridItem,
  Center,
  HStack,
  Text,
  IconButton,
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FiEye, FiShoppingCart } from "react-icons/fi";
import { Link } from "react-router-dom";
import { Product } from "../../app/models/product";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();

  return (
    <GridItem p={50} w="100%">
      <Box
        bg={useColorModeValue("white", "gray.800")}
        maxW="sm"
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Center>
          <Image
            src={product.pictureURL}
            alt={`Picture of ${product.name}`}
            roundedTop="lg"
          />
        </Center>

        <Box p="6">
          <Box d="flex" alignItems="baseline"></Box>
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="2xl"
              fontWeight="semibold"
              as="h4"
              lineHeight="tight"
              isTruncated
              wordBreak={["break-word"]}
            >
              {product.name}
            </Box>
            <Tooltip
              label="Add to cart"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <IconButton
                icon={<FiShoppingCart />}
                onClick={() =>
                  dispatch(
                    addBasketItemAsync({ productId: product.id, quantity: 1 })
                  )
                }
                display={"flex"}
                aria-label="Add to cart"
                isLoading={status.includes("pendingAddItem" + product.id)}
                variant={"ghost"}
              />
            </Tooltip>
          </Flex>

          <HStack
            alignContent="center"
            spacing={4}
            justifyContent={"space-between"}
          >
            <Box fontSize="2xl" color={useColorModeValue("gray.800", "white")}>
              £<Text as="span"> {product.price.toFixed(2)}</Text>
            </Box>
            <Tooltip
              label="View product"
              bg="white"
              placement={"top"}
              color={"gray.800"}
              fontSize={"1.2em"}
            >
              <ChakraLink
                as={Link}
                to={`/catalog/${product.id}`}
                display={"flex"}
              >
                <Icon as={FiEye} h={7} w={7} alignSelf={"center"} />
              </ChakraLink>
            </Tooltip>
          </HStack>
        </Box>
      </Box>
    </GridItem>
  );
}

export default ProductCard;
