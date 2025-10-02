import { z } from "zod/v4";
import parsePhoneNumber from "libphonenumber-js";

export const signupFormSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    address: z.string().min(5, "Address is required"),
    phoneNumber: z.string().superRefine((value, ctx) => {
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
    }),
    email: z.email(),
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
          ),
        confirmPassword: z.string(),
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
  })
  .required();
