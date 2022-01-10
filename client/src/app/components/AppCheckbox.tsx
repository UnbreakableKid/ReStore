import { Checkbox, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface AppCheckboxProps extends UseControllerProps {
  label: string;
  isRequired?: boolean;
}

const AppCheckbox: React.FC<AppCheckboxProps> = (props: AppCheckboxProps) => {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <FormControl
      id={props.label.toLowerCase().replace(" ", "")}
      isRequired={props.isRequired}
    >
      <FormLabel>{props.label}</FormLabel>
      <Checkbox checked={field.value} {...field} />
    </FormControl>
  );
};

export default AppCheckbox;
