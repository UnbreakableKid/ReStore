import {
  Flex,
  Box,
  Image,
  useColorModeValue,
  Icon,
  chakra,
  Tooltip,
  GridItem,
  Center,
  HStack,
  Text,
  Link,
  IconButton,
} from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiShoppingCart } from "react-icons/fi";
import agent from "../../api/agent";
import { Product } from "../../app/models/product";

interface Props {
  product: Product;
}

function ProductCard({ product }: Props) {
  const [loading, setLoading] = useState(false);

  function handleAddItem(productId: number) {
    setLoading(true);
    agent.Basket.addItem(productId)
      .catch((error) => console.log("error", error))
      .finally(() => setLoading(false));
  }

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
                onClick={() => handleAddItem(product.id)}
                display={"flex"}
                aria-label="Add to cart"
                isLoading={loading}
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
              <Link href={`/catalog/${product.id}`} display={"flex"}>
                <Icon as={FiEye} h={7} w={7} alignSelf={"center"} />
              </Link>
            </Tooltip>
          </HStack>
        </Box>
      </Box>
    </GridItem>
  );
}

export default ProductCard;
