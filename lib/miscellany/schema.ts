import z4 from "zod/v4";
import parsePhoneNumber from "libphonenumber-js";
import { Currency } from "lucide-react";

export const SignupFormSchema = z4.object({
  name: z4.string().min(1, "Name is required").trim(),
  address: z4.string().min(5, "Address is required").trim(),
  phoneNumber: z4
    .string()
    .superRefine((value, ctx) => {
      const formattedValue = value.startsWith("+") ? value : `+${value}`;

      const phoneNumber = parsePhoneNumber(
        formattedValue.replace(/\s+/g, "").toString()
      );

      if (!phoneNumber || !phoneNumber.isValid()) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid phone number",
        });
      }
    })
    .trim(),
  email: z4.email().trim(),
  password: z4
    .object({
      password: z4
        .string()
        .min(8, "Password must be at least 8 characters long")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        )
        .trim(),
      confirmPassword: z4.string().trim(),
    })
    .superRefine((data, ctx) => {
      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: "custom",
          message: "Passwords do not match",
          path: ["confirmPassword"],
        });
      }
    }),
  logo: z4
    .file()
    .max(5_000_000, "Image size must not exceed 5MB")
    .mime(
      ["image/jpeg", "image/png", "image/svg+xml"],
      "Unsupported file format (Image must be a jpeg, png, or svg)"
    )
    .optional(),
});

export const OTPFormSchema = z4.object({
  pin: z4
    .string()
    .trim()
    .min(6, {
      message: "Your one-time password must be 6 digits.",
    })
    .max(6, {
      message: "Your one-time password must be 6 digits.",
    }),
});

export const LoginDataSchema = z4.object({
  email: z4.email().trim(),
  password: z4
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(
      /[^A-Za-z0-9]/,
      "Password must contain at least one special character"
    )
    .trim(),
});

export const InvoiceFormSchema = z4.object({
  companyName: z4.string().min(1, "Company name is required").trim(),
  companyAddress: z4
    .string()
    .min(10, "Company address must exceed 10 characters")
    .trim(),
  companyEmail: z4.email().trim().optional(),
  contactPerson: z4
    .object({
      title: z4
        .string()
        .min(2, "Title must exceed 1 character")
        .max(5, "Title must not exceed 5 characters")
        .trim(),
      name: z4.string().min(1, "Name must exceed 1 character").trim(),
    })
    .optional(),
  phoneNumber: z4
    .string()
    .superRefine((value, ctx) => {
      const formattedValue = value.startsWith("+") ? value : `+${value}`;

      const phoneNumber = parsePhoneNumber(
        formattedValue.replace(/\s+/g, "").toString()
      );

      if (!phoneNumber || !phoneNumber.isValid()) {
        ctx.addIssue({
          code: "custom",
          message: "Invalid phone number",
        });
      }
    })
    .trim()
    .optional(),
  purchaseOrder: z4.string().trim().optional(),
  invoiceNumber: z4.string().trim(),
  invoiceDate: z4.string().trim(),
  dueDate: z4.string().trim(),
  customInvoiceFields: z4
    .array(
      z4
        .object({
          label: z4
            .string()
            .min(2, "Label must exceed 2 characters")
            .max(10, "Label must not exceed 10 characters")
            .trim(),
          content: z4.string().min(2, "Label must exceed 2 characters").trim(),
        })
        .required()
    )
    .optional(),
  invoiceItems: z4.array(
    z4.object({
      item: z4.string().min(1, "Item name is required").trim(),
      quantity: z4.string().min(1, "Quantity is required").trim(),
      unitPrice: z4.object({
        currency: z4.string().trim(),
        price: z4.string().min(1, "Unit price is required").trim(),
      }),
      subTotal: z4.string().min(1).trim(),
      description: z4
        .string()
        .max(250, "Description must not exceed 250 characters")
        .trim()
        .optional(),
    })
  ),
  notes: z4
    .string()
    .max(300, "Notes must not exceed 300 characters")
    .trim()
    .optional(),
  terms: z4
    .string()
    .max(300, "Notes must not exceed 300 characters")
    .trim()
    .optional(),
  logo: z4
    .file()
    .max(5_000_000, "Image size must not exceed 5MB")
    .mime(
      ["image/jpeg", "image/png", "image/svg+xml"],
      "Unsupported file format (Image must be a jpeg, png, or svg)"
    )
    .optional(),
  discount: z4.string().trim().optional(),
  tax: z4.string().trim().optional(),
  shipping: z4.string().trim().optional(),
});
