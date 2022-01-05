import {
  Center,
  Container,
  HStack,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import CheckBoxButton from "../../app/components/CheckBoxButton";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import LoadingComponent from "../../app/layout/LoadingComponent";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import CatalogPagination from "./CatalogPagination";
import {
  fetchFilters,
  fetchProductsAsync,
  productSelectors,
  setPageNumber,
  setProductParams,
} from "./catalogSlice";
import ProductList from "./ProductList";
import ProductSearch from "./ProductSearch";

export default function Catalog() {
  const sortOptions = [
    { value: "name", label: "Name" },
    { value: "price", label: "Price - Low to high" },
    { value: "priceDesc", label: "Price - High to low" },
  ];

  const products = useAppSelector(productSelectors.selectAll);

  const {
    productsLoaded,
    status,
    filtersLoaded,
    brands,
    types,
    productParams,
    metaData,
  } = useAppSelector((state) => state.catalog);
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

  // if (!metaData) return <LoadingComponent message="Loading metaData..." />;

  return (
    <Container maxW={"container.xxl"}>
      <HStack align={"start"}>
        <Stack mt={55} spacing={10}>
          <ProductSearch />
          <Container
            bg={colors.cardBg}
            h={"fit-content"}
            rounded={"md"}
            boxShadow={"lg"}
          >
            <Center ml={-2} mt={"10%"} p={3}>
              <RadioButtonGroup
                onChange={(e) => dispatch(setProductParams({ orderBy: e }))}
                options={sortOptions}
                selectedValue={productParams.orderBy}
              />
            </Center>
          </Container>
          <Container bg={colors.cardBg} h={60} rounded={"md"} boxShadow={"lg"}>
            <Center ml={-10} mt={"15%"}>
              <CheckBoxButton
                items={brands}
                checked={productParams.brands}
                onChange={(items: string[]) =>
                  dispatch(setProductParams({ brands: items }))
                }
              />
            </Center>
          </Container>
          <Container bg={colors.cardBg} h={40} rounded={"md"} boxShadow={"lg"}>
            <Center ml={-65} mt={"15%"}>
              <CheckBoxButton
                items={types}
                checked={productParams.types}
                onChange={(items: string[]) =>
                  dispatch(setProductParams({ types: items }))
                }
              />
            </Center>
          </Container>
        </Stack>
        <Container w={"full"} maxW={"full"}>
          <Stack>
            {status.includes("pending") || !metaData ? (
              <LoadingComponent message="Loading..." />
            ) : (
              <>
                <ProductList products={products} />
                <Center>
                  <CatalogPagination
                    metadata={metaData}
                    onPageChange={(page: number) =>
                      dispatch(setPageNumber({ pageNumber: page }))
                    }
                  />
                </Center>
              </>
            )}
          </Stack>
        </Container>
      </HStack>
    </Container>
  );
}
