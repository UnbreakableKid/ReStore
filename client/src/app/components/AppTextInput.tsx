import { FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface AppTextInputProps extends UseControllerProps {
  label: string;
  isRequired?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = (
  props: AppTextInputProps
) => {
  const { fieldState, field } = useController({ ...props, defaultValue: "" });
  return (
    <FormControl
      id={props.label.toLowerCase().replace(" ", "")}
      isRequired={props.isRequired}
    >
      <FormLabel>{props.label}</FormLabel>
      <Input type="text" {...props} {...field} w={"full"} />
    </FormControl>
  );
};

export default AppTextInput;
