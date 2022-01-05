import { Radio, RadioGroup, Stack } from "@chakra-ui/react";

interface Props {
  options: any[];
  onChange: (value: any) => void;
  selectedValue: string;
}

export default function RadioButtonGroup({
  options,
  onChange,
  selectedValue,
}: Props) {
  return (
    <RadioGroup onChange={onChange} value={selectedValue}>
      <Stack>
        {options.map((option) => (
          <Radio value={option.value} key={option.label}>
            {option.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
