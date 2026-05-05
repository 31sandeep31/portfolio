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
import { link as linkStyles } from "@heroui/theme";
import NextLink from "next/link";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  LinkedinIcon,
  MailIcon,
  DownloadIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  WhatsAppIcon,
} from "@/components/icons";

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

export const Navbar = () => {
  const pathname = usePathname();

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-2" href="/">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
              SK
            </span>
            <p className="font-bold text-inherit">Sandeep Kafle</p>
          </NextLink>
        </NavbarBrand>
        <ul className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === "/"
                : pathname?.startsWith(item.href);

            return (
              <NavbarItem key={item.href} isActive={isActive}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                  )}
                  data-active={isActive}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            );
          })}
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
            as={Link}
            className="text-sm font-medium"
            color="primary"
            href={siteConfig.links.cv}
            startContent={<DownloadIcon size={18} />}
            variant="flat"
          >
            Download CV
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
        <Button
          isIconOnly
          as={Link}
          aria-label="Download CV"
          color="primary"
          href={siteConfig.links.cv}
          variant="flat"
        >
          <DownloadIcon size={18} />
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
