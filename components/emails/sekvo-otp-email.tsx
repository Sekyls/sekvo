import { SekvoOTPEmailProps } from "@/lib/types";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";

export default function SekvoOTPEmail({ otp }: SekvoOTPEmailProps) {
  return (
    <Html>
      <Head />
      <Preview>Verify your Sekvo account - OTP inside</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Img
              src="/logo.png"
              width="160"
              height="67"
              alt="Sekvo"
              style={logo}
            />
          </Section>

          <Section
            style={{
              padding: "48px 56px",
              textAlign: "center",
            }}
          >
            <Text
              style={{
                backgroundColor: "grey",
                borderRadius: "10px",
                color: "#ffff",
                display: "block",
                fontSize: "12px",
                fontWeight: 900,
                letterSpacing: "0.5px",
                margin: "5px auto",
                padding: "6px 16px",
                width: "40%",
                textTransform: "uppercase" as const,
                textAlign: "center",
              }}
            >
              Security Verification
            </Text>

            <Heading
              style={{
                color: "#1a1a1a",
                fontSize: "28px",
                fontWeight: 700,
                lineHeight: "36px",
                margin: "20px 0 16px 0",
                textAlign: "center",
              }}
            >
              Verify Your Identity
            </Heading>

            <Text style={description}>
              Enter the verification code below to complete your authentication.
              This code will expire in 5 minutes.
            </Text>

            <Section style={codeContainer}>
              <Text style={code}>{otp}</Text>
            </Section>

            <Section style={divider} />

            <Section
              style={{
                textAlign: "left",
                color: "#f71735",
                borderRadius: "8px",
                margin: "3px 30px 0",
                padding: "20px 24px",
              }}
            >
              <Text style={securityTitle}>Security Tips</Text>
              <Text style={securityText}>
                • Never share this code with anyone
              </Text>
              <Text style={securityText}>
                • Sekvo will never ask for your code via phone or email
              </Text>
              <Text style={securityText}>
                • If you didn't request this code, please ignore this email
              </Text>
            </Section>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>© 2025 Sekvo. All rights reserved.</Text>
            <Text style={footerSubtext}>
              This is an automated message. Please do not reply to this email.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "transparent",
  fontFamily:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  padding: "40px 0",
};

const container = {
  backgroundColor: "transparent",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.07), 0 10px 20px rgba(0, 0, 0, 0.06)",
  margin: "0 auto",
  maxWidth: "600px",
  overflow: "hidden",
};

const header = {
  backgroundColor: "#011627",
  padding: "40px 0px",
  textAlign: "center" as const,
  borderBottom: "2px solid #011627",
};

const logo = {
  display: "block",
  margin: "0 auto",
};

const description = {
  color: "#6b7280",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 32px 0",
};

const codeContainer = {
  background: "linear-gradient(135deg, #e91e63 0%, #ff5722 50%, #ff9800 100%)",
  borderRadius: "8px",
  margin: "10px auto",
  padding: "32px 24px",
  textAlign: "center" as const,
  width: "60%",
};

const code = {
  color: "white",
  fontSize: "42px",
  fontWeight: 900,
  letterSpacing: "12px",
  lineHeight: "48px",
  margin: "0",
  textAlign: "center" as const,
};

// const buttonContainer = {
//   margin: "40px 0px auto",
//   textAlign: "center" as const,
// };

// const button = {
//   width: "80%",
//   borderRadius: "8px",
//   color: "#ffffff",
//   display: "inline-block",
//   fontSize: "16px",
//   fontWeight: 600,
//   lineHeight: "24px",
//   padding: "14px 32px",
//   textDecoration: "none",
//   textAlign: "center" as const,
//   background: "#ff9f1c",
// };

const divider = {
  borderTop: "1px solid #E5E7EB",
  margin: "32px 0",
};

const securityTitle = {
  fontSize: "14px",
  fontWeight: 700,
  margin: "0 0 12px 0",
};

const securityText = {
  fontSize: "14px",
  lineHeight: "20px",
  margin: "0 0 8px 0",
};

// const helpText = {
//   color: "#6b7280",
//   fontSize: "14px",
//   lineHeight: "20px",
//   margin: "0",
//   textAlign: "center" as const,
// };

// const link = {
//   color: "#4F46E5",
//   textDecoration: "underline",
// };

const footer = {
  backgroundColor: "#011627",
  borderTop: "1px solid #E5E7EB",
  padding: "32px 56px",
  textAlign: "center" as const,
  marginTop: "5px",
};

const footerText = {
  color: "#ffff",
  fontSize: "14px",
  fontWeight: 500,
  margin: "0 0 8px 0",
};

const footerSubtext = {
  color: "#9ca3af",
  fontSize: "12px",
  margin: "0",
};
