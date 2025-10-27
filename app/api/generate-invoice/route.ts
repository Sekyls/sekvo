import getVerifiedUser from "@/actions/db/get-verified-user";
import { TemplateDataSchema } from "@/lib/miscellany/schema";

export async function POST(req: Request) {
try {
      const {} = await TemplateDataSchema.parseAsync(req.body);

      const user = await getVerifiedUser();
} catch (error) {
    
}
}
