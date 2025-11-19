import z4 from "zod/v4";
import { PuppeteerPDFRequestBodySchema } from "./schema";
import { HTTPResponseType } from "./types";

export async function generatePDF(res: Response, recipientName: string) {
  try {
    const pdfBlob = await res.blob();
    const pdfObjectURL = URL.createObjectURL(pdfBlob);
    const pdfDownloadLink = document.createElement("a");
    pdfDownloadLink.style.display = "none";
    pdfDownloadLink.href = pdfObjectURL;
    const timestamp = new Date().toISOString().replace(/[:]/g, "-");
    pdfDownloadLink.download = `invoice-${recipientName}-${timestamp}.pdf`;
    document.body.appendChild(pdfDownloadLink);
    return pdfDownloadLink;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}

export async function invokePuppeteer(
  data: z4.infer<typeof PuppeteerPDFRequestBodySchema>
) {
  try {
    const res = await fetch("/api/invoice/generate-invoice-pdf", {
      body: JSON.stringify(data),
      method: "POST",
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const error: HTTPResponseType = await res.json();
      throw new Error(error.error?.message);
    }
    return res;
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
