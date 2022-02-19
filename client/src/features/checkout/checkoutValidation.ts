import * as yup from "yup";

export const checkoutValidationSchema = [
  yup.object({
    fullName: yup.string().required("Full name is required"),
    addressLine1: yup.string().required("Address1 is required"),
    addressLine2: yup.string().required(),
    city: yup.string().required(),
    state: yup.string().required(),
    zipCode: yup.string().required(),
    country: yup.string().required(),
  }),
  yup.object(),
  yup.object({
    cardName: yup.string().required(),
  }),
];
