"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { signOut, useSession } from "next-auth/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from "@/components/ui/sidebar";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
import selltoIcon from "@/assets/icon.svg";

import { LogOut, Bell, CreditCard, BadgeCheck, Sparkles } from "lucide-react";
import { ChevronsUpDown, FileUser, Ticket, Store, Cog } from "lucide-react";
const navItems = [
  { icon: Store, label: "Sellers", url: "/sellers" },
  {
    icon: FileUser,
    label: "Seller Applications",
    url: "/sellers/applications",
  },
  { icon: Ticket, label: "Seller Tickers", url: "/sellers/tickets" },
  { icon: Cog, label: "Settings", url: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(pathname);
  const { data: session } = useSession();
  const user = session?.user;
  const {
    state,
    open,
    setOpen,
    openMobile,
    setOpenMobile,
    isMobile,
    toggleSidebar,
  } = useSidebar();

  useEffect(() => {
    setActivePage(pathname);
  }, [pathname]);

  function handleButtonClick(itemUrl: string) {
    if (isMobile) setOpenMobile(!openMobile);
    setActivePage(itemUrl);
  }
  const handleLogOut = async () => {
    await signOut({ redirectTo: "/login" });
  };
  return (
    <Sidebar collapsible="icon" className="z-[100]">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/" onClick={() => handleButtonClick("/")}>
                <div className="flex aspect-square size-9 items-center justify-center rounded-lg bg-primary/25 text-sidebar-primary-foreground">
                  <Image
                    src={selltoIcon}
                    alt="Sellto logo"
                    width={24}
                    height={24}
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Sellto.io</span>
                  <span className="truncate text-xs text-accent-foreground/60">
                    Admin Dashboard
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="p-0">
          {/* <SidebarGroupLabel>Application</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.label}
                    onClick={() => handleButtonClick(item.url)}
                    className={cn(
                      "h-11 [&>svg]:size-[1.3rem] rounded-none pl-4",
                      activePage === item.url
                        ? "bg-gradient-to-r from-primary/35  via-primary/10 via-25% hover:bg-transparent "
                        : "text-muted-foreground hover:text-foreground  opacity-85 hover:bg-transparent hover:opacity-100 hover:bg-gradient-to-r from-secondary/80  to-transparent transition-all duration-300"
                    )}
                  >
                    <Link href={item.url}>
                      <item.icon
                        size={60}
                        className={cn(
                          activePage === item.url
                            ? "text-primary2 opacity-1"
                            : ""
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-destructive/20 group/ed"
            >
              {state === "expanded" ? (
                <Avatar className="size-9">
                  <AvatarImage src={user?.image || ""} alt={"profile image"} />
                  <AvatarFallback className="">CN</AvatarFallback>
                </Avatar>
              ) : (
                <LogOut
                  onClick={handleLogOut}
                  className="ml-2 size-4 group-hover/ed:text-destructive"
                />
              )}

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user?.name}</span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <LogOut
                onClick={handleLogOut}
                className="ml-auto size-4 group-hover/ed:text-destructive"
              />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
