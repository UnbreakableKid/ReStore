import {
  Pagination,
  usePagination,
  PaginationNext,
  PaginationPage,
  PaginationPrevious,
  PaginationContainer,
  PaginationPageGroup,
  PaginationSeparator,
} from "@ajna/pagination";
import { Center } from "@chakra-ui/react";

export default function CatalogPagination() {
  const { currentPage, setCurrentPage, pagesCount, pages } = usePagination({
    pagesCount: 12,
    initialState: { currentPage: 1 },
  });

  return (
    <Center>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious>Previous</PaginationPrevious>
          <PaginationPageGroup
            isInline
            align={"center"}
            separator={<PaginationSeparator />}
          >
            {pages.map((page: number) => (
              <PaginationPage
                w={7}
                key={`pagination_page_${page}`}
                page={page}
                _current={{
                  bg: "green.300",
                  fontSize: "sm",
                  w: 10,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Center>
  );
}
