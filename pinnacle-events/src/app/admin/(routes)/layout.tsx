

import { AppSidebar } from "@/components/admin/layout/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Suspense } from "react";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default async function AdminLayout({
    children,
}: Readonly<AdminLayoutProps>) {

    return (
        <SidebarProvider>
            <Suspense fallback={<></>}>
                <AppSidebar />
            </Suspense>

            <SidebarInset>
                <div className="w-full rounded-xl pl-3 pt-3">
                    <SidebarTrigger size="icon-lg" />
                </div>
                <main className="flex flex-1 flex-col p-6">
                    {children}
                </main>
            </SidebarInset>
        </SidebarProvider>
    );
}