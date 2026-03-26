import * as Yup from "yup";

export const contactSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});
