import { PuppeteerPDFRequestBodySchema } from "@/lib/misc/schema";
import { NextResponse } from "next/server";
import Puppeteer, { Browser } from "puppeteer";

export async function POST(request: Request) {
  let browser: Browser;
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
      return console.log("BASE_URL_DEV or BASE_URL_PROD is not set");
    }

    const invoicePreviewURL = `${baseURL}/invoice-preview/${invoiceID}?agent=puppeteer`;

    let logoHTML = "";
    if (issuerBrandLogo) {
      logoHTML = `<img src="${issuerBrandLogoURL}" style="width:48px; height:48px; object-fit:cover; display:block;"/>`;
    } else if (ownerRelationLogo) {
      logoHTML = `<img src="${ownerLogoURL}" style="width:48px; height:48px; object-fit:cover; display:block;"/>`;
    }

    browser = await Puppeteer.launch({
      headless: true,
      executablePath: Puppeteer.executablePath(),
    });
    const page = await browser.newPage();

    await page.goto(invoicePreviewURL, {
      waitUntil: "networkidle0",
    });

    const pdfUint8Buffer = await page.pdf({
      format: "A4",
      printBackground: true,
      displayHeaderFooter: true,
      margin: {
        top: "0px",
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
  </div>
`,
    });

    const pdf = Buffer.from(pdfUint8Buffer);
    await browser.close();

    return new NextResponse(pdf, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=invoice-${invoiceID}.pdf`,
      },
    });
  } catch (error) {
    if (browser!) {
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
  } finally {
    if (browser!) {
      await browser.close();
    }
  }
}
