export type SignupFormValues = {
  name: string;
  address: string;
  email: string;
  phoneNumber: string;
  password: {
    password: string;
    confirmPassword: string;
  };
  logo?: File | undefined;
};

export interface SekvoOTPEmailProps {
  otp: number;
}