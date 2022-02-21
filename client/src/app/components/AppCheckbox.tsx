import { Checkbox, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface AppCheckboxProps extends UseControllerProps {
  label: string;
  isRequired?: boolean;
  disabled?: boolean;
}

const AppCheckbox: React.FC<AppCheckboxProps> = (props: AppCheckboxProps) => {
  const { field } = useController({
    ...props,
    defaultValue: false,
  });

  return (
    <FormControl
      id={props.label.toLowerCase().replace(" ", "")}
      isRequired={props.isRequired}
    >
      <FormLabel>{props.label}</FormLabel>
      <Checkbox checked={field.value} {...field} disabled={props.disabled} />
    </FormControl>
  );
};

export default AppCheckbox;
