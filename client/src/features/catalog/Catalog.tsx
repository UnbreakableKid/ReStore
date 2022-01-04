import {
  Center,
  Checkbox,
  CheckboxGroup,
  Container,
  HStack,
  Input,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CatalogPagination from "./CatalogPagination";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
} from "./catalogSlice";
import ProductList from "./ProductList";

export default function Catalog() {
  const products = useAppSelector(productSelectors.selectAll);

  const [radioValue, setRadioValue] = useState("Alphabetical");

  const { productsLoaded, status, filtersLoaded, brands, types } =
    useAppSelector((state) => state.catalog);
  const dispatch = useAppDispatch();

  const colors = {
    cardBg: useColorModeValue("gray.50", "gray.900"),
  };

  useEffect(() => {
    if (!productsLoaded) dispatch(fetchProductsAsync());
  }, [productsLoaded, dispatch]);

  useEffect(() => {
    if (!filtersLoaded) dispatch(fetchFilters());
  }, [filtersLoaded, dispatch]);

  if (status.includes("pending"))
    return <LoadingComponent message="Loading Products..." />;

  return (
    <Container maxW={"container.xxl"}>
      <HStack align={"start"}>
        <Stack mt={55} spacing={10}>
          <Input placeholder="Search Item" />
          <Container
            bg={colors.cardBg}
            h={"fit-content"}
            rounded={"md"}
            boxShadow={"lg"}
          >
            <Center ml={-2} mt={"10%"} p={3}>
              <RadioGroup onChange={setRadioValue} value={radioValue}>
                <Stack>
                  <Radio value="Alphabetical">Alphabetical</Radio>
                  <Radio value="Price - High to Low">Price - High to Low</Radio>
                  <Radio value="Price - Low to High">Price - Low to High</Radio>
                </Stack>
              </RadioGroup>
            </Center>
          </Container>
          <Container bg={colors.cardBg} h={60} rounded={"md"} boxShadow={"lg"}>
            <Center ml={-10} mt={"15%"}>
              <CheckboxGroup colorScheme="green">
                <Stack>
                  {brands.map((type) => (
                    <Checkbox key={type} value={type}>
                      {type}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Center>
          </Container>
          <Container bg={colors.cardBg} h={40} rounded={"md"} boxShadow={"lg"}>
            <Center ml={-65} mt={"15%"}>
              <CheckboxGroup colorScheme="green">
                <Stack>
                  {types.map((type) => (
                    <Checkbox key={type} value={type}>
                      {type}
                    </Checkbox>
                  ))}
                </Stack>
              </CheckboxGroup>
            </Center>
          </Container>
        </Stack>
        <Stack>
          <ProductList products={products} />
          <CatalogPagination />
        </Stack>
      </HStack>
    </Container>
  );
}
