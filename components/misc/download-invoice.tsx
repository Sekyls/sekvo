"use client";

import z4 from "zod/v4";
import { Button } from "../ui/button";
import { Download } from "lucide-react";
import { toastError } from "@/lib/misc/toast-config";
import { PuppeteerPDFRequestBodySchema } from "@/lib/misc/schema";
import { useEffect, useState } from "react";
import { generatePDF, invokePuppeteer } from "@/lib/misc/download-invoice";

export default function DownloadInvoice({
  data,
  recipientName,
  agent,
}: {
  data: z4.infer<typeof PuppeteerPDFRequestBodySchema>;
  recipientName: string;
  agent?: string;
}) {
  const [downloadLink, setDownloadLink] = useState<HTMLAnchorElement | null>(
    null
  );

  useEffect(() => {
    if (agent) return;

    async function getLink() {
      const pdfStreamResponse = await invokePuppeteer(data);

      if (!pdfStreamResponse) return;

      const link = await generatePDF(pdfStreamResponse, recipientName);

      if (link) setDownloadLink(link);
    }

    getLink();
  }, [agent, data, recipientName]);

  return (
    <Button
      onClick={() => {
        if (downloadLink) {
          downloadLink.click();
          setTimeout(() => {
            URL.revokeObjectURL(downloadLink.href);
            downloadLink.remove();
          }, 2000);
          return;
        }
        toastError("Download failed");
      }}
      className="print:hidden rounded-full size-10 primary-gradient flex justify-center items-center p-2 fixed top-1/2 right-1/6"
    >
      <Download className="text-white" />
    </Button>
  );
}
