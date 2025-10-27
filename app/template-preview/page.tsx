import TemplateI from "@/components/invoice-templates/template-I";
import { dummyData } from "@/lib/miscellany/constants";

export default function page() {
  return <TemplateI data={dummyData} />;
}
