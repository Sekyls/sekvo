import { PuppeteerPDFRequestBodySchema } from "@/lib/misc/schema";
import { NextResponse } from "next/server";
import type { Browser } from "puppeteer-core";
import puppeteerCore from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";

export const maxDuration = 60;

export async function POST(request: Request) {
  let browser: Browser | null = null;

  try {
    const body = await request.json();
    const data = PuppeteerPDFRequestBodySchema.safeParse(body);

    if (!data.success) {
      throw new Error(data.error.message);
    }

    const {
      invoiceID,
      issuerBrandLogo,
      issuerBrandLogoURL,
      ownerLogoURL,
      ownerRelationaddress,
      ownerRelationemail,
      ownerRelationLogo,
      ownerRelationname,
    } = data.data;

    const baseURL =
      process.env.NODE_ENV === "development" || process.env.NODE_ENV === "test"
        ? process.env.BASE_URL_DEV
        : process.env.BASE_URL_PROD;

    if (!baseURL) {
      console.log("BASE_URL_DEV or BASE_URL_PROD is not set");
      return NextResponse.json({ error: "Base URL missing" }, { status: 500 });
    }

    const invoicePreviewURL = `${baseURL}/invoice-preview/${invoiceID}?agent=puppeteer`;

    let logoHTML = "";
    if (issuerBrandLogo) {
      logoHTML = `<img src="${issuerBrandLogoURL}" style="width:48px; height:48px; object-fit:cover; display:block;"/>`;
    } else if (ownerRelationLogo) {
      logoHTML = `<img src="${ownerLogoURL}" style="width:48px; height:48px; object-fit:cover; display:block;"/>`;
    }

    if (process.env.VERCEL || process.env.NODE_ENV === "production") {
      const executablePath = await chromium.executablePath(
        `https://github.com/Sparticuz/chromium/releases/download/v131.0.0/chromium-v131.0.0-pack.tar`
      );

      browser = await puppeteerCore.launch({
        args: chromium.args,
        executablePath,
        headless: true,
      });
    } else {
      const { default: puppeteer } = await import("puppeteer");
      browser = (await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
      })) as unknown as Browser;
    }

    const page = await browser.newPage();

    await page.goto(invoicePreviewURL, {
      waitUntil: "networkidle0",
    });

    const pdfUint8Buffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      margin: {
        top: "10mm",
        bottom: "20mm",
        left: "10mm",
        right: "10mm",
      },
      headerTemplate: `<div style="display:none !important;"></div>`,
      footerTemplate: `
        <div style="font-size:14px; width:100%; padding:10px 10mm; border-top:1px dashed #d1d5db;">
          <table style="width:100%; border-collapse:collapse;">
            <tr>
              <td style="width:50%; vertical-align:middle;">
                <table style="border-collapse:collapse;">
                  <tr>
                    <td style="vertical-align:middle; padding-right:2px;">
                      <span style="font-weight:900; color:#133e58; font-size:20px;">
                        ${ownerRelationname}
                      </span>
                    </td>
                    <td style="vertical-align:middle; padding-top:5px">
                     ${logoHTML}
                    </td>
                  </tr>
                </table>
              </td>
              <td style="width:50%; text-align:right; vertical-align:top; color:#4b5563;">
                <div>${ownerRelationaddress}</div>
                <div>${ownerRelationemail}</div>
                <div>Page <span class="pageNumber"></span> of <span class="totalPages"></span></div>
              </td>
            </tr>
          </table>
        </div>`,
    });

    const pdf = Buffer.from(pdfUint8Buffer);

    await browser.close();
    browser = null;

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice-${invoiceID}.pdf`,
      },
    });
  } catch (error) {
    console.error("PDF Generation Error:", error);

    if (browser) {
      await browser.close();
    }

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          error: { code: 500, message: error.message, details: error.stack },
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    );
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}
