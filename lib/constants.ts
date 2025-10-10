export const FOOTER_LINKS = [
  {
    title: "Free Tools",
    links: [{ title: "Value Pricing Calculator", url: "#" }],
  },
  {
    title: "Invoice",
    links: [{ title: "Send via email", url: "#" }],
  },
  {
    title: "Legal",
    links: [
      { title: "Terms of Services", url: "#" },
      { title: "Privacy Policy", url: "#" },
    ],
  },
  {
    title: "Company",
    links: [
      { title: "Pricing", url: "#" },
      { title: "Affiliates", url: "#" },
      { title: "Blog", url: "#" },
    ],
  },
];

export const SIGNUP_FORM_FIELDS: {
  fieldName:
    | "name"
    | "address"
    | "phoneNumber"
    | "email"
    | "password"
    | "logo"
    | "password.password"
    | "password.confirmPassword";
  label: string;
  placeholder: string;
  phone: boolean;
  type: "text" | "email" | "password" | "tel" | "file";
}[] = [
  {
    fieldName: "name",
    label: "Company Name",
    placeholder: "Inskpire Corp",
    phone: false,
    type: "text",
  },
  {
    fieldName: "address",
    label: "Address",
    placeholder: "Mile 11, West Hills",
    phone: false,
    type: "text",
  },
  {
    fieldName: "email",
    label: "Email",
    placeholder: "company@email.com",
    phone: false,
    type: "email",
  },
  {
    fieldName: "phoneNumber",
    label: "Phone Number",
    placeholder: "Enter phone number",
    phone: true,
    type: "tel",
  },
  {
    fieldName: "password.password",
    label: "Password",
    placeholder: "~k$M@X7#fL0vE!p!a",
    phone: false,
    type: "text",
  },
  {
    fieldName: "password.confirmPassword",
    label: "Confirm Password",
    placeholder: "~k$M@X7#fL0vE!p!a",
    phone: false,
    type: "text",
  },
];

export const SESSION_EXPIRATION = 60 * 60 * 24 * 7;
