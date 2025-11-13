import z4 from "zod/v4";
import parsePhoneNumber from "libphonenumber-js";

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

export const SignupFormDataSchema = SignupFormSchema.omit({
  password: true,
}).extend({
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

export const OTPFormSchema = z4.object({
  pin: z4
    .string()
    .trim()
    .min(6, { message: "Your one-time password must be 6 digits." })
    .max(6, { message: "Your one-time password must be 6 digits." }),
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
  recipientName: z4.string().min(1, "Company name is required").trim(),
  recipientAddress: z4
    .string()
    .min(10, "Company address must exceed 10 characters")
    .trim(),

  recipientEmail: z4
    .email()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  recipientContactPerson: z4
    .object({
      title: z4
        .string()
        .min(2, "Title must exceed 1 character")
        .max(5, "Title must not exceed 5 characters")
        .trim(),
      name: z4.string().min(1, "Name must exceed 1 character").trim(),
    })
    .optional(),

  issuer: z4.object({
    name: z4.string("Required").min(2, "Required").trim(),
    role: z4.string("Required").min(2, "Required").trim(),
    signature: z4
      .file("Select a file")
      .max(5_000_000, "Image size must not exceed 5MB")
      .mime(
        ["image/jpeg", "image/png", "image/svg+xml"],
        "Unsupported file format (Image must be a jpeg, png, or svg)"
      ),
  }),

  recipientPhoneNumber: z4
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional()
    .superRefine((value, ctx) => {
      if (!value) return;
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

  purchaseOrder: z4
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  invoiceNumber: z4.string().min(1).trim(),
  invoiceDate: z4.string().min(1).trim(),
  dueDate: z4.string().min(1).trim(),

  customInvoiceFields: z4
    .array(
      z4.object({
        label: z4
          .string()
          .min(2, "Label must exceed 2 characters")
          .max(10, "Label must not exceed 10 characters")
          .trim(),
        content: z4.string().min(2, "Label must exceed 2 characters").trim(),
      })
    )
    .optional(),

  invoiceItems: z4.array(
    z4.object({
      item: z4.string().min(1, "Item name is required").trim(),
      quantity: z4.string().min(1, "Quantity is required").trim(),
      unitPrice: z4.object({
        currency: z4.string().min(1).trim(),
        price: z4.string().min(1, "Unit price is required").trim(),
      }),
      subTotal: z4.string().min(1).trim(),
      description: z4
        .string()
        .trim()
        .transform((val) => (val === "" ? undefined : val))
        .optional(),
    })
  ),

  notes: z4
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  terms: z4
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  issuerBrandLogo: z4
    .file()
    .max(5_000_000, "Image size must not exceed 5MB")
    .mime(
      ["image/jpeg", "image/png", "image/svg+xml"],
      "Unsupported file format (Image must be a jpeg, png, or svg)"
    )
    .optional(),

  discount: z4
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  tax: z4
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  shipping: z4
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .optional(),

  paymentMethods: z4.object({
    mtnMobileMoney: z4
      .object({
        checked: z4.boolean(),
        accountName: z4.string().trim(),
        accountNumber: z4.string().trim(),
      })
      .superRefine((data, ctx) => {
        if (data.checked && data.accountName === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account name is required",
            path: ["paymentMethods", "mtnMobileMoney", "accountName"],
          });
        }
        if (data.checked && data.accountNumber === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account number is required",
            path: ["paymentMethods", "mtnMobileMoney", "accountNumber"],
          });
        }
      }),
    telecelCash: z4
      .object({
        checked: z4.boolean(),
        accountName: z4.string().trim(),
        accountNumber: z4.string().trim(),
      })
      .superRefine((data, ctx) => {
        if (data.checked && data.accountName === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account name is required",
            path: ["paymentMethods", "telecelCash", "accountName"],
          });
        }
        if (data.checked && data.accountNumber === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account number is required",
            path: ["paymentMethods", "telecelCash", "accountNumber"],
          });
        }
      }),
    atMoney: z4
      .object({
        checked: z4.boolean(),
        accountName: z4.string().trim(),
        accountNumber: z4.string().trim(),
      })
      .superRefine((data, ctx) => {
        if (data.checked && data.accountName === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account name is required",
            path: ["paymentMethods", "atMoney", "accountName"],
          });
        }
        if (data.checked && data.accountNumber === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account number is required",
            path: ["paymentMethods", "atMoney", "accountNumber"],
          });
        }
      }),
    bankTransfer: z4
      .object({
        checked: z4.boolean(),
        bankName: z4.string().trim(),
        accountName: z4.string().trim(),
        accountNumber: z4.string().trim(),
        branch: z4.string().trim(),
      })
      .superRefine((data, ctx) => {
        if (data.checked && data.accountName === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account name is required",
            path: ["paymentMethods", "bankTransfer", "accountName"],
          });
        }
        if (data.checked && data.accountNumber === "") {
          ctx.addIssue({
            code: "custom",
            message: "Account number is required",
            path: ["paymentMethods", "bankTransfer", "accountNumber"],
          });
        }
        if (data.checked && data.branch === "") {
          ctx.addIssue({
            code: "custom",
            message: "Branch is required",
            path: ["paymentMethods", "bankTransfer", "branch"],
          });
        }
        if (data.checked && data.bankName === "") {
          ctx.addIssue({
            code: "custom",
            message: "Bank Name is required",
            path: ["paymentMethods", "bankTransfer", "bankName"],
          });
        }
      }),
    paymentGateway: z4
      .object({
        checked: z4.boolean(),
        link: z4.string().trim(),
      })
      .superRefine((data, ctx) => {
        const linkValidation = z4.url();
        if (data.checked) {
          const validLink = linkValidation.safeParse(data.link);
          if (!validLink.success) {
            ctx.addIssue({
              code: "custom",
              message: "Input a valid URL",
              path: ["paymentMethods", "paymentGateway", "link"],
            });
          }
        }
      }),
    others: z4
      .object({
        checked: z4.boolean(),
        specifyOther: z4.string().trim(),
      })
      .superRefine((data, ctx) => {
        if (data.checked && data.specifyOther === "") {
          ctx.addIssue({
            code: "custom",
            message: "Required",
            path: ["paymentMethods", "others", "specifyOther"],
          });
        }
      }),
    cash: z4.object({
      checked: z4.boolean(),
    }),
    cheque: z4.object({
      checked: z4.boolean(),
    }),
  }),
});

export const CalculationSchema = z4.object({
  grandTotal: z4.number(),
  aggregateSubTotals: z4.number(),
  calculatedDiscount: z4.number(),
  calculatedTax: z4.number(),
  utilisePercentDiscount: z4.boolean(),
  utilisePercentTax: z4.boolean(),
  utiliseTaxableShipping: z4.boolean(),
  currency: z4.string(),
});

export const InvoiceFormDataSchema = InvoiceFormSchema.safeExtend(
  CalculationSchema.shape
);
