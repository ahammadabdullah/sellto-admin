import { cookies } from "next/headers";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";

import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen =
    cookieStore.get("sidebar:state")?.value === "false" ? false : true;

  return (
    <SidebarProvider defaultOpen={defaultOpen} className="bg-red-300">
      <AppSidebar />
      <SidebarInset>
        <header className="flex sticky top-0 bg-background h-16 shrink-0 items-center gap-2 border-b px-4 z-50">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
        </header>
        <main className="w-[100vw] md:w-[74vw] lg:w-auto relative">
          <div className="z-10 relative">{children}</div>
          <div className="w-full h-full fixed right-0 bottom-0 ">
            <div className="circel bg_primary_radial_gradient w-[150%] sm:w-full aspect-square rounded-full absolute right-[-40%] top-0 max-[1200px]:top-[90%]  pointer-events-none z-[-3] opacity-70"></div>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
