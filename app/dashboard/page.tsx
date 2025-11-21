import { AppSidebar } from "@/components/dashboard/page/app-sidebar";
import { SiteHeader } from "@/components/dashboard/page/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import InvoiceFormProvider from "@/providers/invoice-form-provider";
import AggregatedInvoiceForm from "@/components/dashboard/page/invoice-form-aggregate";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 container-constraint">
              <InvoiceFormProvider>
                <AggregatedInvoiceForm />
              </InvoiceFormProvider>
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
