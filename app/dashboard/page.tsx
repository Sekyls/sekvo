import { AppSidebar } from "@/components/dashboard/app-sidebar";
import { DataTable } from "@/components/dashboard/data-table";
import { SiteHeader } from "@/components/dashboard/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "./data.json";
import SectionCards from "@/components/dashboard/section-cards";
import InvoiceForm from "@/components/dashboard/create-invoice-form";

export default function Page() {
  return (
    <SidebarProvider>
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 container-constraint">
              <SectionCards />
              <InvoiceForm />
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
