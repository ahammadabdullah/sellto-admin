"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

// import { selltoLogo as SelltoLogo } from "@/components/ui/custom/Logo";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { cn } from "@/lib/utils";
// import selltoLogo from "@/assets/sellto_logo.svg";
import selltoIcon from "@/assets/icon.svg";
// Menu items.

import { LogOut, Bell, CreditCard, BadgeCheck, Sparkles } from "lucide-react";
import { ChevronsUpDown, FileUser, Ticket, Store, Cog } from "lucide-react";
const navItems = [
  { icon: Store, label: "Sellars", url: "/sellars" },
  {
    icon: FileUser,
    label: "Sellar Applications",
    url: "/sellars/applications",
  },
  { icon: Ticket, label: "Sellar Tickers", url: "/sellars/tickets" },
  { icon: Cog, label: "Settings", url: "/settings" },
];

export function AppSidebar() {
  const pathname = usePathname();
  const [activePage, setActivePage] = useState(pathname);
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
  return (
    <Sidebar collapsible="icon">
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
                        : "text-muted-foreground hover:text-foreground  opacity-85 hover:opacity-100"
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
              <Avatar className="size-9">
                {/* <AvatarImage
                        src={data.user.avatar}
                        alt={data.user.name}
                      /> */}
                <AvatarFallback className="">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Farhan</span>
                <span className="truncate text-xs">darkid@gmail.com</span>
              </div>
              <LogOut className="ml-auto size-4 group-hover/ed:text-destructive" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
