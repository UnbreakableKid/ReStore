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
import { MetaData } from "../../app/models/pagination";

interface Props {
  metadata: MetaData;
  onPageChange: (page: number) => void;
}

export default function CatalogPagination({ metadata, onPageChange }: Props) {
  const { currentPage, totalCount, totalPages, pageSize } = metadata;

  const { pages, currentPage: current } = usePagination({
    total: totalCount,
    initialState: {
      pageSize: pageSize,
      isDisabled: false,
      currentPage: currentPage,
    },
    pagesCount: totalPages,
  });

  return (
    <Center>
      <Pagination
        pagesCount={totalPages}
        currentPage={current}
        onPageChange={(page) => onPageChange(page)}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious mr={4}>Previous</PaginationPrevious>
          <PaginationPageGroup
            isInline
            align={"center"}
            separator={<PaginationSeparator />}
            spacing={3}
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
          <PaginationNext ml={4}>Next</PaginationNext>
        </PaginationContainer>
      </Pagination>
    </Center>
  );
}
