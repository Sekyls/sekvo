import TemplateI from "@/components/invoice-templates/template-I";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  return <TemplateI id={id} />;
}
