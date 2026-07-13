"use client";

import {
    Award,
    BriefcaseBusiness,
    LogOut
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

import { authClient } from "@/lib/auth/client";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
} from "@/components/ui/sidebar";

const navItems = [
    {
        title: "Works",
        href: "/admin/works",
        icon: BriefcaseBusiness,
    },
    {
        title: "Awards",
        href: "/admin/awards",
        icon: Award,
    }
];

export function AppSidebar() {
    
    const pathname = usePathname();

    async function logout() {
        const { error } = await authClient.signOut();

        if (error) {
            toast.error(error.message);
            return;
        }

        window.location.href = "/admin/login";
    }

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader className="border-b">
                <div className="flex items-center justify-between px-2 py-2 group-data-[collapsible=icon]:hidden">
                    <div>
                        <h2 className="text-lg font-semibold">Pinnacle</h2>
                        <p className="text-xs text-muted-foreground">
                            Admin Panel
                        </p>
                    </div>
                    <div className="md:hidden">
                        <SidebarTrigger />
                    </div>
                </div>
                <div className="hidden size-8 items-center justify-center rounded-md font-bold group-data-[collapsible=icon]:flex">
                    PE
                </div>
            </SidebarHeader>

            <SidebarContent>
                <SidebarMenu className="gap-2 pl-2 pt-4">
                    {navItems.map((item) => (
                        <SidebarMenuItem key={item.href}>
                            <Link href={item.href}>
                                <SidebarMenuButton
                                    isActive={pathname.startsWith(item.href)}
                                    tooltip={item.title}
                                    size="lg"
                                    className="cursor-pointer flex items-center group-data-[collapsible=icon]:justify-center"
                                >
                                    <item.icon className="w-5! h-5!" />
                                    <span className="ml-1 group-data-[collapsible=icon]:hidden">{item.title}</span>
                                </SidebarMenuButton>
                            </Link>
                        </SidebarMenuItem>
                    ))}
                </SidebarMenu>
            </SidebarContent>

            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton onClick={logout} size="lg" className="cursor-pointer">
                            <LogOut />
                            <span>Logout</span>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>

            <SidebarRail />
        </Sidebar>
    );
}