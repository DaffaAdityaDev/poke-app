import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";

// Define navigation items for the Navbar
const navItems = [
  { label: "Pokédex", href: "/" },
  { label: "Compare", href: "/compare" },
  { label: "Types", href: "/types" },
  { label: "Evolutions", href: "/evolutions" },
  { label: "Abilities", href: "/abilities" },
];

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Navbar brand and desktop navigation items */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          {/* App logo/title */}
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <p className="font-bold text-inherit">Poké App</p>
          </NextLink>
        </NavbarBrand>
        {/* Desktop navigation menu */}
        <div className="hidden sm:flex gap-4 justify-start ml-2">
          {/* Map through navItems to create NavbarItems */}
          {navItems.map((item) => (
            <NavbarItem key={item.href}>
              <NextLink
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      {/* Theme switch and mobile menu toggle */}
      <NavbarContent className="sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem>
          <ThemeSwitch />
        </NavbarItem>
        <NavbarMenuToggle className="sm:hidden" />
      </NavbarContent>

      {/* Mobile navigation menu */}
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {/* Map through navItems to create NavbarMenuItems */}
          {navItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};
