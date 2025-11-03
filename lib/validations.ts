// FILE: lib/validations.ts
import { z } from "zod";

export const checkoutFormSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters"),
    email: z.string().min(1, "Email is required").email("Invalid email format"),
    phone: z.string().min(1, "Phone number is required"),
    address: z
      .string()
      .min(1, "Address is required")
      .min(5, "Address must be at least 5 characters"),
    zipCode: z.string().min(1, "ZIP Code is required"),
    city: z.string().min(1, "City is required"),
    country: z.string().min(1, "Country is required"),
    paymentMethod: z.enum(["e-money", "cash-on-delivery"]),
    eMoneyNumber: z.string().optional().or(z.literal("")),
    eMoneyPin: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) => {
      if (data.paymentMethod === "e-money") {
        return !!(data.eMoneyNumber && data.eMoneyPin);
      }
      return true;
    },
    {
      message: "e-Money Number and PIN are required",
      path: ["eMoneyNumber"],
    }
  );

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;
