import { getInvoiceFromDB } from "@/actions/db/get-invoice";
import { uint8ArrayToDataURL } from "./utils";

export async function getPDFPreview(id: string) {
  try {
    const {
      invoice,
      recipientContactPerson,
      customInvoiceFields,
      invoiceItems,
      issuerRelation,
      ownerRelation,
      paymentMethods,
    } = await getInvoiceFromDB(id);

    let signatureURL = "";
    let ownerLogoURL = "";
    let issuerBrandLogoURL = "";
    if (issuerRelation?.signature) {
      signatureURL = uint8ArrayToDataURL(issuerRelation.signature);
    }
    if (ownerRelation.logo) {
      ownerLogoURL = uint8ArrayToDataURL(ownerRelation.logo);
    }
    if (invoice.issuerBrandLogo) {
      issuerBrandLogoURL = uint8ArrayToDataURL(invoice.issuerBrandLogo);
    }
    return {
      invoice,
      recipientContactPerson,
      customInvoiceFields,
      invoiceItems,
      issuerRelation,
      ownerRelation,
      paymentMethods,
      signatureURL,
      ownerLogoURL,
      issuerBrandLogoURL,
    };
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message);
    }
  }
}
