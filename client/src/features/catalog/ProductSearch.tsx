import { Input } from "@chakra-ui/react";
import { debounce } from "lodash";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { setProductParams } from "./catalogSlice";

export default function ProductSearch() {
  const { productParams } = useAppSelector((state) => state.catalog);
  const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
  const dispatch = useAppDispatch();

  const debouncedSearch = debounce((event) => {
    dispatch(setProductParams({ searchTerm: event.target.value }));
  }, 3000);

  return (
    <Input
      placeholder="Search Item"
      value={searchTerm || ""}
      w={"full"}
      onChange={(event) => {
        setSearchTerm(event.target.value);
        debouncedSearch(event);
      }}
    />
  );
}
