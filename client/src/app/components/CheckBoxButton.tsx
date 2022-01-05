import { CheckboxGroup, Stack, Checkbox } from "@chakra-ui/react";
import React, { useState } from "react";

interface CheckBoxButtonProps {
  items: string[];
  checked?: string[];
  onChange: (value: string[]) => void;
}

const CheckBoxButton: React.FC<CheckBoxButtonProps> = ({
  items,
  checked,
  onChange,
}) => {
  const [checkedItems, setCheckedItems] = useState(checked || []);

  function handleChecked(value: string) {
    const currentIndex = checkedItems.findIndex((item) => item === value);

    let newChecked: string[] = [];

    if (currentIndex === -1) {
      newChecked = [...checkedItems, value];
    } else newChecked = checkedItems.filter((item) => item !== value);

    setCheckedItems(newChecked);
    onChange(newChecked);
    console.log("done", newChecked);
  }
  return (
    <CheckboxGroup colorScheme="green">
      <Stack>
        {items.map((item) => (
          <Checkbox
            key={item}
            value={item}
            checked={checkedItems.indexOf(item) !== -1}
            onChange={() => handleChecked(item)}
          >
            {item}
          </Checkbox>
        ))}
      </Stack>
    </CheckboxGroup>
  );
};

export default CheckBoxButton;
