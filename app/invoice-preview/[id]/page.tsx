import TemplateI from "@/components/invoice-templates/template-I";

export default async function InvoicePreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ agent: string | undefined }>;
}) {
  const { id } = await params;
  const { agent } = await searchParams;

  return <TemplateI id={id} agent={agent} />;
}
