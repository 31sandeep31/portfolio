"use client";

import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import { Popover, PopoverTrigger, PopoverContent } from "@heroui/popover";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/dropdown";
import { Tooltip } from "@heroui/tooltip";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/icons";

const LockIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="18"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="18"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

type SocialLink = {
  label: string;
  href: string;
  Icon: React.ComponentType<{ className?: string; size?: number }>;
};

const moreSocials: SocialLink[] = [
  { label: "Facebook", href: siteConfig.links.facebook, Icon: FacebookIcon },
  { label: "Instagram", href: siteConfig.links.instagram, Icon: InstagramIcon },
  { label: "X", href: siteConfig.links.x, Icon: XIcon },
  { label: "WhatsApp", href: siteConfig.links.whatsapp, Icon: WhatsAppIcon },
  { label: "GitHub", href: siteConfig.links.github, Icon: GithubIcon },
];

const ChevronDown = ({ className }: { className?: string }) => (
  <svg
    className={className}
    fill="none"
    height="16"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    width="16"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

export const Navbar = () => {
  const pathname = usePathname();
  const isToolActive = siteConfig.tools.some(
    (t) => !t.external && pathname?.startsWith(t.href),
  );

  return (
    <HeroUINavbar
      classNames={{
        base: "bg-background/95 backdrop-blur-xl border-b border-default-200 shadow-sm",
        wrapper: "px-4 md:px-6",
      }}
      maxWidth="xl"
      position="sticky"
    >
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center" href="/">
            <p className="font-bold text-base sm:text-lg tracking-tight">
              Sandeep Kafle
            </p>
          </NextLink>
        </NavbarBrand>

        <ul className="hidden md:flex gap-1 justify-start ml-6">
          {siteConfig.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <NavbarItem key={item.href} isActive={isActive}>
                <NextLink
                  className={clsx(
                    "relative px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-default-700 hover:text-foreground hover:bg-default-100",
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}

          <NavbarItem isActive={isToolActive}>
            <Dropdown placement="bottom-start">
              <DropdownTrigger>
                <button
                  className={clsx(
                    "relative inline-flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isToolActive
                      ? "text-primary bg-primary/10"
                      : "text-default-700 hover:text-foreground hover:bg-default-100",
                  )}
                  type="button"
                >
                  Tools
                  <ChevronDown />
                </button>
              </DropdownTrigger>
              <DropdownMenu
                aria-label="Tools"
                itemClasses={{
                  base: "gap-2 data-[hover=true]:bg-default-100",
                }}
              >
                {siteConfig.tools.map((tool) => (
                  <DropdownItem
                    key={tool.label}
                    as={tool.external ? Link : NextLink}
                    description={tool.description}
                    endContent={
                      tool.external ? (
                        <span className="text-default-400 text-xs">↗</span>
                      ) : null
                    }
                    href={tool.href}
                    {...(tool.external
                      ? {
                          isExternal: true,
                          target: "_blank",
                          rel: "noopener noreferrer",
                        }
                      : {})}
                  >
                    {tool.label}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>

          <NavbarItem>
            <Tooltip content={siteConfig.maps.title} placement="bottom">
              <Link
                isExternal
                aria-label={siteConfig.maps.title}
                className="relative inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium text-default-700 hover:text-foreground hover:bg-default-100 transition-colors"
                href={siteConfig.maps.href}
              >
                {siteConfig.maps.label}
              </Link>
            </Tooltip>
          </NavbarItem>
        </ul>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden md:flex gap-3 items-center">
          <Link
            isExternal
            aria-label="Email"
            href={siteConfig.links.email}
            title="Email"
          >
            <MailIcon className="text-default-500" />
          </Link>
          <Link
            isExternal
            aria-label="LinkedIn"
            href={siteConfig.links.linkedin}
            title="LinkedIn"
          >
            <LinkedinIcon className="text-default-500" />
          </Link>

          <Popover placement="bottom-end">
            <PopoverTrigger>
              <Button
                isIconOnly
                aria-label="More social links"
                className="text-default-500"
                radius="full"
                size="sm"
                variant="light"
              >
                <svg
                  fill="currentColor"
                  height="18"
                  viewBox="0 0 24 24"
                  width="18"
                >
                  <circle cx="5" cy="12" r="2" />
                  <circle cx="12" cy="12" r="2" />
                  <circle cx="19" cy="12" r="2" />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent>
              <div className="flex flex-col gap-1 p-1 min-w-[180px]">
                {moreSocials.map(({ label, href, Icon }) => (
                  <Link
                    key={label}
                    isExternal
                    className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-default-100 text-foreground"
                    href={href}
                  >
                    <Icon className="text-default-500" />
                    <span className="text-sm">{label}</span>
                  </Link>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          <ThemeSwitch />
        </NavbarItem>

        <NavbarItem className="hidden md:flex">
          <Button
            as={NextLink}
            className="text-sm font-medium"
            color="primary"
            href={siteConfig.links.cv}
            startContent={<LockIcon />}
            variant="flat"
          >
            Request CV
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <Button
          isIconOnly
          as={NextLink}
          aria-label="Request CV access"
          color="primary"
          href={siteConfig.links.cv}
          variant="flat"
        >
          <LockIcon />
        </Button>
        <ThemeSwitch />
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item.href}-${index}`}>
              <Link color="foreground" href={item.href} size="lg">
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
          <div className="flex gap-4 mt-4 flex-wrap">
            <Link isExternal aria-label="Email" href={siteConfig.links.email}>
              <MailIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="LinkedIn"
              href={siteConfig.links.linkedin}
            >
              <LinkedinIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Facebook"
              href={siteConfig.links.facebook}
            >
              <FacebookIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="Instagram"
              href={siteConfig.links.instagram}
            >
              <InstagramIcon className="text-default-500" />
            </Link>
            <Link isExternal aria-label="X" href={siteConfig.links.x}>
              <XIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="WhatsApp"
              href={siteConfig.links.whatsapp}
            >
              <WhatsAppIcon className="text-default-500" />
            </Link>
            <Link
              isExternal
              aria-label="GitHub"
              href={siteConfig.links.github}
            >
              <GithubIcon className="text-default-500" />
            </Link>
          </div>
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
