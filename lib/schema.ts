import { z } from "zod/v4";
import parsePhoneNumber from "libphonenumber-js";

export const SignupFormSchema = z.object({
  name: z.string().min(1, "Name is required").trim(),
  address: z.string().min(5, "Address is required").trim(),
  phoneNumber: z
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
  email: z.email().trim(),
  password: z
    .object({
      password: z
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
      confirmPassword: z.string().trim(),
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
  logo: z
    .file()
    .max(5_000_000, "Image size must not exceed 5MB")
    .mime(
      ["image/jpeg", "image/png", "image/svg+xml"],
      "Unsupported file format (Image must be a jpeg, png, or svg)"
    )
    .optional(),
});

export const OTPFormSchema = z.object({
  pin: z
    .string()
    .trim()
    .min(6, {
      message: "Your one-time password must be 6 digits.",
    })
    .max(6, {
      message: "Your one-time password must be 6 digits.",
    }),
});

export const LoginDataSchema = z.object({
  email: z.email().trim(),
  password: z
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

export const InvoiceFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required").trim(),
  companyAddress: z
    .string()
    .min(10, "Company address must exceed 10 characters")
    .trim(),
  companyEmail: z.email().trim().optional(),
  contactPerson: z
    .object({
      title: z
        .string()
        .min(2, "Title must exceed 1 character")
        .max(5, "Title must not exceed 5 characters")
        .trim(),
      name: z.string().min(1, "Name must exceed 1 character").trim(),
    })
    .optional(),
  phoneNumber: z
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
  purchaseOrder: z.string().trim().optional(),
  invoiceNumber: z.string().trim(),
  invoiceDate: z.string().trim(),
  dueDate: z.string().trim(),
  customInvoiceFields: z
    .array(
      z
        .object({
          label: z
            .string()
            .min(2, "Label must exceed 2 characters")
            .max(10, "Label must not exceed 10 characters")
            .trim(),
          content: z.string().min(2, "Label must exceed 2 characters").trim(),
        })
        .required()
    )
    .optional(),
  invoiceItems: z.array(
    z.object({
      item: z.string().min(1, "Item name is required").trim(),
      quantity: z.string().min(1, "Item name is required").trim(),
      unitPrice: z.number(),
      description: z
        .string()
        .min(5, "Description must exceed 5 characters")
        .max(250, "Description must not exceed 250 characters"),
    })
  ),
  notes: z
    .string()
    .max(300, "Notes must not exceed 300 characters")
    .trim()
    .optional(),
  terms: z
    .string()
    .max(300, "Notes must not exceed 300 characters")
    .trim()
    .optional(),
});
