import { redirect } from "next/navigation";


import { getSession } from "@/lib/auth/session";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/admin/layout/app-sidebar";

interface AdminLayoutProps {
    children: React.ReactNode;
}

export default async function AdminLayout({
    children,
}: Readonly<AdminLayoutProps>) {

    return (
        <SidebarProvider>
            <AppSidebar />

            <SidebarInset>
                {/* <AdminHeader user={currentUser} /> */}
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